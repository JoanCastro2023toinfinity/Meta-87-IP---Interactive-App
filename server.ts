import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy init Gemini AI SDK
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not configured in environment.');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Post-Mortem & Incident Diagnostic Endpoint
app.post('/api/governance-support/diagnose', async (req, res) => {
  try {
    const { 
      incidentTitle,
      postMortemSummary, 
      incidentLogs, 
      affectedArea, 
      businessImpact,
      teamContext,
      userRole = 'operador_trinchera',
      cognitiveLoad = 'critica_saturada',
      availableIpsSummary
    } = req.body;

    if (!incidentTitle && !postMortemSummary) {
      return res.status(400).json({ error: 'Debes ingresar al menos el título o resumen del incidente / post-mortem.' });
    }

    const systemPrompt = `Eres el "Agente Especialista en Soporte y Gobernanza Sistémica" (Capa de Soporte de Nivel 3 / C-Level) basado en el inventario forense de 87 IPs de Gobernanza Sistémica.
Tu objetivo NO es dar consejos genéricos, sino identificar las fallas estructurales de arquitectura de gobernanza detrás del incidente, cruzarlo directamente con las IPs del catálogo, y entregar:
1. Deconstrucción de la falla del SOP tradicional.
2. Adaptación de salida según el ROL de quien consulta (${userRole}) y su NIVEL DE CARGA COGNITIVA (${cognitiveLoad}).
   - Si es 'operador_trinchera': Alivio radical, reducción de ambigüedad, derecho a veto (IP-041), artefactos de ensamble ciego (IP-046) y descarte de culpas.
   - Si es 'mando_medio_lead': Criterios de delegación fractal, contrapesos y reducción de cuellos de botella de arbitraje.
   - Si es 'c_level_fundador': Desacople del fundador (IP-081), blindaje de margen bruto (IP-067/IP-070) y asimetría de capital.
3. Prescripción de IPs con trazabilidad en tiempo real paso a paso para replicar la solución.
4. Responde estrictamente en formato JSON válido con la siguiente estructura:
{
  "diagnosis": "Diagnóstico forense y causa raíz sistémica del fallo",
  "rootCauseCategory": "talento_cargas | divergencia_estrategia_realidad | escalabilidad_sin_heroes | capital_economics | riesgo_breakpoints | producto_oferta_modelos | criterio_gobernanza_fractal | metodologia_trinchera",
  "traditionalSopFailure": "Por qué el SOP tradicional o manual corporativo falló miserablemente al ignorar la entropía",
  "rolePerspectiveOutput": {
    "role": "${userRole}",
    "cognitiveLoadHandling": "Cómo este dictamen reduce y maneja la carga cognitiva del rol seleccionado",
    "actionPrioritization": "Prioridad #1 de acción inmediata para este rol"
  },
  "recommendedIps": [
    {
      "code": "IP-XXX",
      "name": "Nombre de la IP",
      "action": "Acción específica a implementar",
      "whyItPrevents": "Cómo este protocolo previene la repetición del incidente",
      "inputsNeeded": ["Input 1", "Input 2"],
      "outputGenerated": "Output verificable entregado"
    }
  ],
  "realTimeTraceabilityStepByStep": [
    {
      "step": 1,
      "phase": "Detección / Veto",
      "trigger": "Condición disparadora inmediata",
      "ipApplied": "IP-041 / etc",
      "verificationMetric": "Métrica o artefacto de verificación"
    },
    {
      "step": 2,
      "phase": "Aislamiento & Insumo Limpio",
      "trigger": "Rechazo de ticket o tarea sin datos",
      "ipApplied": "IP-046 / etc",
      "verificationMetric": "Plantilla parametrizada completada"
    },
    {
      "step": 3,
      "phase": "Desacople de Héroe / Cierre",
      "trigger": "Resolución mediante protocolo sin escalamiento a fundador",
      "ipApplied": "IP-081 / etc",
      "verificationMetric": "Zero intervenciones manuales de C-Level"
    }
  ],
  "operatorDescompressionTactics": [
    "Medida 1 de alivio directo para el operador de trinchera",
    "Medida 2 para remover la carga cognitiva inútil"
  ],
  "fractalGovernanceContract": "Regla o heurística inviolable a instaurar en el equipo (criterio fractal)",
  "gisImpactEstimated": "+25 pts GIS estimados al implementar"
}`;

    const userMessage = `INCIDENTE / POST-MORTEM PRESENTADO:
Rol del consultor: ${userRole}
Nivel de Carga Cognitiva: ${cognitiveLoad}
Título: ${incidentTitle || 'Incidente no titulado'}
Área Afectada: ${affectedArea || 'Operaciones / Producto'}
Impacto en Negocio: ${businessImpact || 'Degradación operativa'}
Contexto de Equipo / Carga: ${teamContext || 'Equipo bajo presión en última milla'}

RELATO DEL POST-MORTEM / LOGS DE FALLA:
${postMortemSummary || incidentLogs || 'Sin detalles adicionales'}

RESUMEN DE REFERENCIA DEL ATLAS (87 IPs de Gobernanza):
${availableIpsSummary || 'Disponibles 87 IPs que cubren custodia de criterio, desacople de héroes, pricing triangulado, ensamble ciego y veto de raíz.'}

Por favor, genera el diagnóstico forense en formato JSON estricto.`;

    let aiResult;
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userMessage}` }] }
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });
      aiResult = JSON.parse(response.text || '{}');
    } catch (err: any) {
      console.warn('Gemini API call skipped or failed, using heuristic governance engine fallback:', err?.message);
      // Fallback governance engine if API key not present or error occurs
      aiResult = {
        diagnosis: "El incidente evidencia una fractura de última milla: los operadores fueron sobrecargados con ambigüedad resolutiva sin artefactos parametrizados, provocando un cuello de botella donde la jerarquía superior tuvo que apagar fuegos manualmente.",
        rootCauseCategory: "escalabilidad_sin_heroes",
        traditionalSopFailure: "Los manuales tradicionales asumen cumplimiento estático y descuidan la entropía real de la trinchera. Forzaron a los operadores a interpretar excepciones sin reglas de veto ni límites de transferencia.",
        rolePerspectiveOutput: {
          role: userRole,
          cognitiveLoadHandling: userRole === 'operador_trinchera' 
            ? "Blindaje contra ambigüedad: se activa derecho a veto y se reducen los campos de reporte a 3 datos verificables."
            : userRole === 'mando_medio_lead'
            ? "Desacople de arbitraje: se definen contrapesos objetivos para evitar que el lead sea el árbitro manual de cada excepción."
            : "Protección de capital y desacople del fundador: retiro del CEO de la cadena crítica de resolución de incidentes.",
          actionPrioritization: userRole === 'operador_trinchera'
            ? "Rechazar de inmediato cualquier ticket sin los inputs del IP-046 bajo amparo del IP-041."
            : "Instaurar el Smart Contract of Criterion (IP-079) para delegar la resolución sin pérdida de control."
        },
        recommendedIps: [
          {
            code: "IP-068",
            name: "Deconstrucción Forense de Tickets",
            action: "Mapear y desarmar el 80% de los tickets repetitivos en subcomponentes pre-resueltos de ensamble ciego.",
            whyItPrevents: "Elimina la necesidad de que el operador improvise o absorba estrés cognitivo en incidentes repetidos.",
            inputsNeeded: ["Bitácora de tickets de los últimos 30 días", "Tasa de repetición por categoría"],
            outputGenerated: "Catálogo de 12 módulos de respuesta pre-ensamblada con 0 ambigüedad"
          },
          {
            code: "IP-041",
            name: "Matriz de Asimetría de Riesgo y Veto",
            action: "Establecer la regla inviolable de veto operativo sin represalias cuando el incidente sobrepase el umbral de seguridad.",
            whyItPrevents: "Frena la cascada de fallas antes de que impacte a clientes o contamine el margen financiero.",
            inputsNeeded: ["Definición de umbral de riesgo no negociable", "Canal de veto formalizado"],
            outputGenerated: "Acta de veto ejecutada y aislamiento inmediato del lote defectuoso"
          },
          {
            code: "IP-081",
            name: "Protocolo de Inversión de Dependencia",
            action: "Retirar al héroe / líder del canal de emergencia y forzar la resolución mediante artefactos auditables.",
            whyItPrevents: "Evita que el fundador o tech lead siga siendo el punto único de fallo y fatiga del sistema.",
            inputsNeeded: ["Lista de decisiones que hoy solo toma el fundador", "Plantilla de criterio auditable"],
            outputGenerated: "Protocolo autoejecutable transferido al equipo de operaciones"
          }
        ],
        realTimeTraceabilityStepByStep: [
          {
            step: 1,
            phase: "Contención & Veto Inmediato (T+0 a T+15 min)",
            trigger: "Entrada de requerimiento incompleto o alerta de colapso de SLA",
            ipApplied: "IP-041 (Veto de Raíz)",
            verificationMetric: "Ticket etiquetado como 'Insumo Deficiente' y congelado sin sanción de SLA"
          },
          {
            step: 2,
            phase: "Aislamiento & Ensamble Parametrizado (T+1h a T+4h)",
            trigger: "Desglose del problema en variables atómicas conocidas",
            ipApplied: "IP-046 & IP-068 (Ensamble Ciego y Deconstrucción)",
            verificationMetric: "El operador resuelve el caso usando piezas modulares preaprobadas en < 4 minutos"
          },
          {
            step: 3,
            phase: "Desacople del C-Level & Cierre del Ciclo (T+24h)",
            trigger: "Reunión de revisión post-incidente",
            ipApplied: "IP-081 (Inversión de Dependencia)",
            verificationMetric: "Cero mensajes directos al fundador; actualización del checklist de gobernanza fractal"
          }
        ],
        operatorDescompressionTactics: [
          "Establecer un buffer de 48 horas con blindaje contra nuevas asignaciones para estabilizar el backlog contaminado.",
          "Sustituir el reporte de texto libre del incidente por una plantilla de ensamble modular de 4 campos obligatorios.",
          "Desactivar las alertas de baja severidad que saturan el canal de guardia sin requerir acción inmediata."
        ],
        fractalGovernanceContract: "Ningún operador está obligado a resolver un ticket cuyo insumo no cumpla con los 3 requisitos de entrada verificables del IP-046.",
        gisImpactEstimated: "+28 pts GIS estimados al implementar"
      };
    }

    return res.json({
      success: true,
      diagnostic: aiResult,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error processing governance diagnostic:', error);
    return res.status(500).json({ 
      error: 'Error procesando el dictamen de gobernanza', 
      details: error?.message 
    });
  }
});

// Chat de soporte interactivo para el operador / reo de última milla
app.post('/api/governance-support/chat', async (req, res) => {
  try {
    const { messages, currentIncidentContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Array de mensajes inválido.' });
    }

    const systemInstruction = `Eres "Soporte de Gobernanza Sistémica en Vivo", un consultor y defensor implacable de los operadores ("reos") de trinchera y líderes operativos.
Tu misión:
1. Dar respuestas rápidas, directas y despresurizantes ante dudas o emergencias operativas.
2. Proteger al operador del burnout aplicando los protocolos del Atlas (las 87 IPs).
3. Recordarles sus derechos de gobernanza (derecho a vetar tareas mal definidas, exigir inputs limpios según IP-046, y escalar sin asumir culpas de diseño sistémico).
4. Citar siempre las IPs pertinentes por código (ej. IP-041, IP-042, IP-068, IP-081) para sustentar la solución.
5. Mantén un tono empático pero implacablemente riguroso y arquitectónico.`;

    try {
      const ai = getGeminiClient();
      const lastMsg = messages[messages.length - 1]?.content || 'Necesito orientación de gobernanza.';
      const contextPrompt = currentIncidentContext 
        ? `Contexto del incidente activo:\n${JSON.stringify(currentIncidentContext, null, 2)}\n\n` 
        : '';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { 
            role: 'user', 
            parts: [{ text: `${systemInstruction}\n\n${contextPrompt}Pregunta del operador:\n${lastMsg}` }] 
          }
        ],
        config: {
          temperature: 0.3,
          maxOutputTokens: 1000
        }
      });

      return res.json({
        reply: response.text,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.warn('Fallback reply due to:', err?.message);
      return res.json({
        reply: `Entiendo la fricción en la trinchera. Bajo la doctrina de Gobernanza Sistémica (especialmente el IP-041 de Veto de Raíz y el IP-046 de Ensamble Ciego): si el ticket o solicitud no contiene los inputs mínimos definidos, el operador tiene la prerrogativa arquitectónica de rechazarlo con la causa 'Insumo Deficiente' sin ser penalizado. Esto no es falta de compromiso; es protección contra la entropía que luego genera post-mortems millonarios. Recomiendo activar IP-068 para deconstruir la causa raíz.`,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error: any) {
    console.error('Error in governance chat:', error);
    return res.status(500).json({ error: 'Error en chat de soporte' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gobernanza Sistémica Platform & Support Layer running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
