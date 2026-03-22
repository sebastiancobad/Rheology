# Polymer Rheology — Interactive Educational Platform

An interactive web application for learning **polymer rheology**: from Newtonian flow fundamentals to advanced viscoelastic characterization and industrial processing applications. Features 3D visualizations, real-time interactive charts, and LaTeX-rendered equations.

## App Structure

The application is organized into **5 separate pages**, each focused on a specific topic. Navigation between pages uses Next.js App Router for fast, code-split loading — only the current page's components are loaded.

### 1. Fundamentals of Rheology (`/fundamentals`)

- Definition of rheology, Deborah number, and the continuum hypothesis.
- **3D Stress Tensor** — Interactive rotating cube with stress component arrows (σ_xx, σ_yy, σ_zz, τ_xy...). Mouse-controlled rotation and zoom.
- **3D Polymer Chain** — Physics-based worm-like chain that deforms in real time via a Weissenberg number (Wi) slider.
- **Flow Curves** — Interactive log-log chart comparing Newtonian, pseudoplastic (shear-thinning), and dilatant fluids with adjustable power-law exponents.
- **Viscosity Models** — Side-by-side comparison of Newtonian, power-law, Herschel-Bulkley, and Cross-WLF models.
- **Creep & Recovery** — Time-dependent compliance response under constant stress with elastic recovery.

### 2. Deep Dive: Polymer Rheology (`/polymer-rheology`)

- How molecular structure determines rheological behavior.
- **Scaling Laws** — η₀ ∝ Mw^3.4, plateau modulus, terminal relaxation times.
- **Frequency Sweep Chart** — Interactive G' (storage), G'' (loss modulus), and tan δ vs angular frequency with sliders for crossover frequency and plateau modulus.
- **Temperature Sweep** — G' and tan δ vs temperature showing glass transition Tg.
- **Extensional Viscosity Chart** — Transient extensional viscosity with strain hardening visualization.
- **Relaxation Spectrum** — Discrete relaxation time spectrum.
- **Master Curves** — Time-temperature superposition with WLF shift factors.

### 3. Measurement Techniques (`/measurement`)

- **3D Rheometer Geometry Selector** — Fully modeled interactive 3D rheometer with real-time rotation:
  - Cone & Plate (uniform shear rate)
  - Parallel Plate (adjustable gap, Mooney correction)
  - Concentric Cylinders / Couette (low-viscosity fluids)
  - RPM slider to animate rotation speed.
- **Capillary Rheometry Corrections** — Interactive Recharts:
  - **Bagley Correction** — ΔP vs L/D at 3 shear rates with sliders for e_B and n'.
  - **Rabinowitsch Correction** — True vs apparent shear rate on log-log scale with live correction factor.
- **Extensional Rheometers** — SER, CaBER, FiSER, Rheotens with specs and ranges.
- **Standard Test Protocols** — 9 tests: amplitude sweep, frequency sweep, temperature sweep, steady shear, creep & recovery, step strain relaxation, LAOS, 3ITT, start-up of steady shear.
- **Common Measurement Pitfalls** — Wall slip, edge fracture, inertia effects, thermal degradation, gap errors, underfill/overfill.
- **MFI vs Full Characterization** — Cost/capability comparison table.

### 4. Industrial Applications (`/applications`)

Detailed cards for each polymer processing method with shear rate ranges, key parameters, and process-specific challenges:

| Process | γ̇ Range (s⁻¹) | Key Aspects |
|---|---|---|
| Injection Molding | 10²–10⁴ | pvT effects, shear-thinning critical |
| Extrusion | 10¹–10³ | Die swell (B = 1.1–1.5), elastic memory |
| Blow Molding | 10⁰–10¹ | Biaxial extension, strain hardening required |
| Film Casting | — | Uniaxial extension, draw resonance instability |
| 3D Printing (FDM) | 10²–10⁴ | Die swell, storage modulus critical |

- Special section on **recycled polymer processing** challenges.

### 5. Literature & Research Gaps (`/literature`)

6 open research areas with detailed gap lists:

1. Recycled polymer rheology
2. Molecular theory & modeling (tube models, LAOS, ML/AI)
3. Processing & digital twins
4. Measurement innovation (rheo-SAXS/SANS, high-throughput)
5. Sustainability & circular economy
6. Advanced fields (4D printing, self-healing, nanocomposites)

Includes **12 seminal textbooks** and **foundational publications** (de Gennes, Doi-Edwards, Cox-Merz, etc.).

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** + React 19 | App Router with per-page code splitting |
| **TypeScript** | Static typing |
| **Tailwind CSS 4** | Utility-first styling |
| **Three.js** + React Three Fiber | 3D visualizations (rheometer, tensor, polymer chain) |
| **Recharts** | Interactive 2D charts |
| **KaTeX** | LaTeX equation rendering |
| **Framer Motion** | Scroll and transition animations |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout (Navigation + Footer)
│   ├── page.tsx                  # Home / Hero
│   ├── globals.css               # Global styles
│   ├── fundamentals/page.tsx     # Section 1
│   ├── polymer-rheology/page.tsx # Section 2
│   ├── measurement/page.tsx      # Section 3
│   ├── applications/page.tsx     # Section 4
│   └── literature/page.tsx       # Section 5
├── components/
│   ├── Navigation.tsx            # Route-based navbar with active state
│   ├── Hero.tsx                  # Landing page hero section
│   ├── Fundamentals.tsx          # Fundamentals content
│   ├── PolymerRheology.tsx       # Polymer rheology content
│   ├── MeasurementTechniques.tsx # Measurement techniques content
│   ├── Applications.tsx          # Industrial applications content
│   ├── LiteratureGaps.tsx        # Literature & gaps content
│   ├── Footer.tsx                # Footer with references
│   ├── SectionWrapper.tsx        # Reusable section container
│   ├── AnimatedSection.tsx       # Framer Motion scroll wrapper
│   ├── Math.tsx                  # KaTeX Tex & TexBlock components
│   ├── 3d/
│   │   ├── RheometerGeometry3D.tsx  # Interactive rheometer geometries
│   │   ├── PolymerChain3D.tsx       # Deformable polymer chain
│   │   └── StressTensor3D.tsx       # 3D stress tensor arrows
│   ├── charts/
│   │   ├── FlowCurveChart.tsx             # Flow curves
│   │   ├── FrequencySweepChart.tsx         # Frequency sweep
│   │   ├── ExtensionalViscosityChart.tsx   # Extensional viscosity
│   │   ├── TemperatureChart.tsx            # Temperature sweep
│   │   ├── RelaxationSpectrumChart.tsx     # Relaxation spectrum
│   │   ├── CreepRecoveryChart.tsx          # Creep & recovery
│   │   ├── ViscosityModelsChart.tsx        # Viscosity models
│   │   └── CapillaryCorrectionsCharts.tsx  # Bagley & Rabinowitsch
│   └── diagrams/
│       └── FlowTypesDiagram.tsx   # Flow types diagram
```

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production
npm start
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

## Interactive Features

- **Real-time sliders** — All charts respond instantly to parameter changes (n', Wi, ω_c, G_N⁰, e_B, RPM, etc.)
- **Rotatable 3D models** — OrbitControls for mouse-driven rotation, zoom, and pan on all 3D scenes.
- **Informative tooltips** — Hover over any data point to see exact values with units.
- **Per-page code splitting** — Each section loads only its own components, keeping initial load fast.
- **Scroll animations** — Sections and cards appear with smooth fade-in animations (Framer Motion).
- **Responsive design** — Adapted for desktop, tablet, and mobile with collapsible navigation.
- **LaTeX equations** — All rheological equations rendered with KaTeX.
