# AGENTS.md

Compartido por Codex y Claude Code. Cada línea de este archivo debe cambiar lo que haces.

## 1. Planifica antes de tocar el código
- Tarea larga: primero dime en 2-3 frases qué crees que estoy buscando
- Empieza solo después de que yo diga que sí
- Escribe los pasos en `PLAN.md`, indicando en cada uno cómo demostrarás que funciona
- Dos intentos fallidos en un mismo paso: detente, anota qué ha fallado y vuelve a planificar
- Si pausas la tarea a mitad: deja `PLAN.md` para que una nueva sesión pueda retomarla

## 2. Haz el cambio mínimo que funcione
- Mantente dentro de esta tarea. No rompas nada que ya funcione
- ¿Hay un compromiso? Sopesa UX (usuarios), DX (el siguiente desarrollador) y AX (el siguiente agente)
- No añadas dependencias nuevas, renombres ni refactorizaciones que nadie haya pedido
- Haz una copia de seguridad antes de eliminar o sobrescribir cualquier cosa

## 3. Divide el trabajo entre subagentes
- El explorador lee, el trabajador edita, el revisor solo informa y nunca edita
- Cada uno recibe una tarea, una condición de finalización y un informe de 5 líneas
- Trabajar en paralelo está bien. Dos agentes sobre el mismo archivo, no
- Comprueba la afirmación clave de un informe antes de construir sobre ella

## 4. Hazte cargo del bug
- Reprodúcelo primero siguiendo mis pasos. ¿No puedes reproducirlo? Dime qué necesitas
- Corrige la causa y después vuelve a ejecutar los mismos pasos
- Nunca silencies un error para hacer que desaparezca

## 5. Verifica antes de decir que está terminado
- Ejecuta las pruebas y lee tú mismo el resultado
- UI: ábrela e intenta romperla: entrada vacía, doble envío, recarga
- ¿No has ejecutado una comprobación? Dilo. Una comprobación no ejecutada no cuenta como superada
- Informa en 2-3 líneas: qué elegiste, a qué renunciaste y por qué

## 6. Anota cada corrección
- Cuando te corrija, añade una línea en Lessons: "Cuando X, haz Y"
- Mismo error dos veces: la lección no está clara. Reescríbela
- Pregúntame antes de cambiar cualquier cosa por encima de Lessons

## Lessons
<!-- Lo más reciente arriba. Elimina lo que ya no aplique. -->
