# Polymer Rheology — Interactive Educational Platform

Plataforma web interactiva para aprender **reología de polímeros**: desde los fundamentos de flujo y deformación hasta la caracterización viscoelástica avanzada y las aplicaciones industriales. Combina visualizaciones 3D, gráficos interactivos en tiempo real y ecuaciones renderizadas con LaTeX.

## Contenido de la aplicación

La web se estructura en **5 secciones principales**, cada una construida con visualizaciones interactivas y contenido científico riguroso:

### 1. Fundamentos de Reología

- Definición de reología, número de Deborah e hipótesis del continuo.
- **Tensor de esfuerzos 3D** — Cubo interactivo con flechas de componentes de esfuerzo (σ_xx, σ_yy, σ_zz, τ_xy...) que se puede rotar con el mouse.
- **Cadena polimérica 3D** — Cadena tipo *worm-like chain* que se deforma en tiempo real al cambiar el número de Weissenberg (Wi) con un slider.
- **Curvas de flujo** — Gráfico log-log interactivo comparando fluidos newtonianos, pseudoplásticos y dilatantes con exponentes ajustables.
- **Modelos de viscosidad** — Comparación entre modelos Newtoniano, ley de potencia, Herschel-Bulkley y Cross-WLF.
- **Creep & Recovery** — Respuesta temporal de la compliancia bajo esfuerzo constante.

### 2. Reología de Polímeros en Profundidad

- Relación entre estructura molecular y comportamiento reológico.
- **Leyes de escalado** — η₀ ∝ Mw^3.4, módulo de plateau, tiempos de relajación terminal.
- **Barrido de frecuencia** — Gráfico interactivo de G' (almacenamiento), G'' (pérdida) y tan δ vs frecuencia angular con sliders para frecuencia de crossover y módulo de plateau.
- **Barrido de temperatura** — Evolución de G' y tan δ con la temperatura, transición vítrea Tg.
- **Viscosidad extensional** — Comportamiento transitorio, endurecimiento por deformación (*strain hardening*).
- **Espectro de relajación** — Distribución discreta de tiempos de relajación.
- **Curvas maestras** — Superposición tiempo-temperatura (factores de desplazamiento WLF).

### 3. Técnicas de Medición

- **Selector 3D de geometrías de reómetro** — Modelos 3D interactivos con rotación en tiempo real:
  - Cono-plato (shear rate uniforme)
  - Placas paralelas (gap ajustable, corrección de Mooney)
  - Cilindros concéntricos / Couette (para baja viscosidad)
  - Control de RPM con slider animado.
- **Correcciones de reometría capilar** — Gráficos interactivos con Recharts:
  - **Corrección de Bagley** — ΔP vs L/D a múltiples tasas de corte con sliders para e_B y n'.
  - **Corrección de Rabinowitsch** — Tasa de corte verdadera vs aparente en escala log-log con factor de corrección en tiempo real.
- **Reómetros extensionales** — SER, CaBER, FiSER, Rheotens con especificaciones y rangos.
- **Protocolos de ensayo estándar** — 9 ensayos: barrido de amplitud, frecuencia, temperatura, corte estacionario, creep, relajación, LAOS, 3ITT, start-up.
- **Errores comunes de medición** — Wall slip, fractura de borde, inercia, degradación térmica, errores de gap.
- **MFI vs caracterización completa** — Tabla comparativa costo/capacidad.

### 4. Aplicaciones Industriales

Tarjetas detalladas para cada proceso de transformación con rangos de γ̇, parámetros clave y desafíos:

| Proceso | Rango γ̇ (s⁻¹) | Aspectos clave |
|---|---|---|
| Inyección | 10²–10⁴ | Efectos pvT, shear-thinning crítico |
| Extrusión | 10¹–10³ | Die swell (B = 1.1–1.5), memoria elástica |
| Soplado | 10⁰–10¹ | Extensión biaxial, strain hardening necesario |
| Film casting | — | Extensión uniaxial, inestabilidad de draw resonance |
| Impresión 3D (FDM) | 10²–10⁴ | Die swell, módulo de almacenamiento crítico |

- Sección especial sobre **procesamiento de polímeros reciclados**.

### 5. Brechas en la Literatura e Investigación

6 áreas de investigación abierta con listas detalladas de gaps:

1. Reología de polímeros reciclados
2. Teoría molecular y modelado (tubos, LAOS, ML/AI)
3. Procesamiento y gemelos digitales
4. Innovación en medición (rheo-SAXS/SANS, alto rendimiento)
5. Sostenibilidad y economía circular
6. Campos avanzados (impresión 4D, auto-reparación, nanocompuestos)

Incluye **12 libros de texto seminales** y **publicaciones fundamentales** (de Gennes, Doi-Edwards, Cox-Merz, etc.).

---

## Tech Stack

| Tecnología | Uso |
|---|---|
| **Next.js 16** + React 19 | Framework principal (App Router) |
| **TypeScript** | Tipado estático |
| **Tailwind CSS 4** | Estilos utility-first |
| **Three.js** + React Three Fiber | Visualizaciones 3D (reómetro, tensor, cadena) |
| **Recharts** | Gráficos 2D interactivos |
| **KaTeX** | Renderizado de ecuaciones LaTeX |
| **Framer Motion** | Animaciones de scroll y transiciones |

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx                # Layout raíz y metadatos
│   ├── page.tsx                  # Página principal (orquesta secciones)
│   └── globals.css               # Estilos globales
├── components/
│   ├── Navigation.tsx            # Navbar fija con detección de scroll
│   ├── Hero.tsx                  # Sección hero con animaciones
│   ├── Fundamentals.tsx          # Sección 1: fundamentos
│   ├── PolymerRheology.tsx       # Sección 2: reología de polímeros
│   ├── MeasurementTechniques.tsx # Sección 3: técnicas de medición
│   ├── Applications.tsx          # Sección 4: aplicaciones industriales
│   ├── LiteratureGaps.tsx        # Sección 5: literatura y gaps
│   ├── Footer.tsx                # Pie de página
│   ├── SectionWrapper.tsx        # Contenedor reutilizable de sección
│   ├── AnimatedSection.tsx       # Wrapper de Framer Motion
│   ├── Math.tsx                  # Componentes Tex y TexBlock (KaTeX)
│   ├── 3d/
│   │   ├── RheometerGeometry3D.tsx  # Geometrías de reómetro 3D
│   │   ├── PolymerChain3D.tsx       # Cadena polimérica deformable
│   │   └── StressTensor3D.tsx       # Tensor de esfuerzos 3D
│   ├── charts/
│   │   ├── FlowCurveChart.tsx             # Curvas de flujo
│   │   ├── FrequencySweepChart.tsx         # Barrido de frecuencia
│   │   ├── ExtensionalViscosityChart.tsx   # Viscosidad extensional
│   │   ├── TemperatureChart.tsx            # Barrido de temperatura
│   │   ├── RelaxationSpectrumChart.tsx     # Espectro de relajación
│   │   ├── CreepRecoveryChart.tsx          # Creep & recovery
│   │   ├── ViscosityModelsChart.tsx        # Modelos de viscosidad
│   │   └── CapillaryCorrectionsCharts.tsx  # Correcciones Bagley & Rabinowitsch
│   └── diagrams/
│       └── FlowTypesDiagram.tsx   # Diagrama de tipos de flujo
```

## Getting Started

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Características interactivas destacadas

- **Sliders en tiempo real** — Todos los gráficos responden instantáneamente a cambios de parámetros (n', Wi, ω_c, G_N⁰, e_B, RPM, etc.)
- **Visualizaciones 3D rotables** — OrbitControls permite rotar, hacer zoom y explorar los modelos 3D con el mouse.
- **Tooltips informativos** — Hover sobre cualquier punto de datos muestra valores exactos con unidades.
- **Animaciones de scroll** — Las secciones y tarjetas aparecen con animaciones suaves al hacer scroll (Framer Motion).
- **Diseño responsive** — Adaptado para desktop, tablet y móvil con navegación colapsable.
- **Ecuaciones LaTeX** — Todas las ecuaciones reológicas renderizadas con KaTeX para máxima claridad tipográfica.
