<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transcript Brain – Smart Summaries</title>
  <style>
    :root {
      --bg: #0b1020;
      --card: #121934;
      --card-2: #0f1530;
      --text: #ecf1ff;
      --muted: #a7b0d2;
      --line: #27315d;
      --accent: #86a8ff;
      --accent-2: #6ee7c8;
    }

    body { margin:0; font-family: Inter, system-ui; background: var(--bg); color: var(--text);}    
    .wrap { max-width:1200px; margin:auto; padding:20px; }

    textarea, input, select { width:100%; padding:10px; border-radius:10px; border:1px solid var(--line); background:#0f1530; color:white; }
    button { padding:10px 15px; border-radius:10px; border:none; cursor:pointer; }
    .primary { background:#6ee7c8; color:black; }
    .card { background:#121934; padding:15px; border-radius:15px; margin-bottom:15px; }
    .output { white-space:pre-wrap; }
  </style>
</head>
<body>
<div class="wrap">

<h1>🧠 Transcript Brain</h1>
<p>Convierte transcripciones en resúmenes claros, visuales y accionables.</p>

<div class="card">
  <h3>🔑 Configuración</h3>
  <input id="apiKey" placeholder="API Key" type="password" />
  <input id="model" value="gpt-4.1-mini" />
</div>

<div class="card">
  <h3>📥 Input</h3>
  <textarea id="inputText" placeholder="Pega tu transcripción..."></textarea>
  <br><br>
  <button class="primary" onclick="generate()">🚀 Generar resumen</button>
</div>

<div class="card">
  <h3>📤 Output</h3>
  <div id="output" class="output"></div>
</div>

</div>

<script>
const PROMPT = `Actúa como un analista ejecutivo.
Convierte la información en un resumen corto, claro y visual.

Reglas:
- Usa emojis en títulos y bullets
- Máximo 6 bullets
- Frases cortas
- Fácil de escanear

Formato:
📢 Título

🟡 Estado
- ...

⚙️ Qué está pasando
- ...

⚠️ Impacto
- ...

🧠 Próximo paso
- ...

⏳ Timeline
- ...
`;

async function generate() {
  const apiKey = document.getElementById("apiKey").value;
  const input = document.getElementById("inputText").value;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content: input }
      ]
    })
  });

  const data = await res.json();
  document.getElementById("output").innerText = data.choices[0].message.content;
}
</script>

</body>
</html>
