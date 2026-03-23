<div align="center">

<img src="https://img.shields.io/badge/Day-4%20%2F%2030-0ea5e9?style=for-the-badge&logo=calendar&logoColor=white" />
<img src="https://img.shields.io/badge/Fetch-API-22c55e?style=for-the-badge&logo=javascript&logoColor=white" />
<img src="https://img.shields.io/badge/HTML5-Canvas-f59e0b?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" />

<br /><br />

# 🪄 BG Remover Pro

### Remove image backgrounds automatically using AI.<br/>Upload any image to get a transparent PNG in seconds.

<br/>

[![🚀 Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-https://background-remover-30in30.vercel.app/-0ea5e9?style=for-the-badge)](https://background-remover-30in30.vercel.app/)
&nbsp;&nbsp;
[![GitHub](https://img.shields.io/badge/⭐%20GitHub-Granth2006-24292e?style=for-the-badge&logo=github)](https://github.com/Granth2006)

</div>

---

## ⚙️ Features

<table>
  <tr>
    <td width="50%">
      <h3>☁️ Intelligent AI Removal</h3>
      Upload an image (up to 5MB, JPG/PNG/WEBP). Backgrounds are flawlessly removed using the high-accuracy remove.bg API.
    </td>
    <td width="50%">
      <h3>🔐 Your Own API Key</h3>
      Configure your free or paid API key directly via the dashboard. It encrypts and saves in localStorage securely.
    </td>
  </tr>
  <tr>
    <td>
      <h3>🎚️ Interactive Slider Review</h3>
      Compare the original and the processed image side-by-side using an immersive "before / after" image slider. 
    </td>
    <td>
      <h3>🎨 Custom Backgrounds</h3>
      Want a black, white, or custom colored background instead of transparency? Pick any hue via the color-picker panel.
    </td>
  </tr>
  <tr>
    <td>
      <h3>📥 Instant High-Res Download</h3>
      Export your new image instantly as a crisp PNG, effectively flattening any custom background colors onto a canvas.
    </td>
    <td>
      <h3>⚡ Seamless Drag & Drop</h3>
      Toss an image straight into the browser. Provides size metrics, resolution checks, and smooth loading spinners.
    </td>
  </tr>
</table>

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Structure & file input areas |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Vanilla styling, slider styles, dark/light theme |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | AI Network requests via Fetch API (`async/await`) |
| `Remove.bg API` | External powerful endpoint for background removal |
| `Canvas API` | For compositing custom solid color backgrounds prior to PNG download |
| ![Vercel](https://img.shields.io/badge/Vercel-000?style=flat&logo=vercel&logoColor=white) | Fast Edge Routing / Hosting |

---

## 📋 Project Info

| | |
|---|---|
| 🏆 **Challenge** | 30 Web Apps in 30 Days |
| 📅 **Day** | Day 4 / 30 |
| 👤 **Author** | Granth Kumar |
| 🌐 **Live URL** | [https://background-remover-30in30.vercel.app/](https://background-remover-30in30.vercel.app/) |
| 🛠️ **Build** | No build step — pure HTML / CSS / JS |
| 📄 **License** | MIT |

---

<details>
<summary>📁 File Structure</summary>

```
4/
├── index.html     # Setup, drag zone, result section, tools
├── script.js      # Fetch logic, canvas download, slider math
└── style.css      # Custom UI components & responsive tweaks
```

</details>

---

<div align="center">

Built by **[Granth Kumar](https://github.com/Granth2006)** &nbsp;·&nbsp; Part of the **30 Web Apps in 30 Days** challenge

[![Live Demo](https://img.shields.io/badge/🚀%20Open%20Live%20Demo-0ea5e9?style=for-the-badge)](https://background-remover-30in30.vercel.app/)

</div>
