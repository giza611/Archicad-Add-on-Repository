# Archicad Add-on Repository

A comprehensive, searchable directory of **227+ add-ons and plugins** for Graphisoft Archicad, curated from official sources and regional markets worldwide.

## Overview

This web application provides architects, designers, and BIM professionals with a centralized resource to discover Archicad add-ons from around the globe. The repository includes both free and paid tools covering various categories of architectural workflows.

## Features

- **Search & Filter**: Find add-ons by name, company, or description
- **Category Tags**: Filter by functionality (Modeling, Rendering, Analysis, Library, Productivity, Import/Export, BIM, Visualization)
- **Regional Coverage**: Add-ons from 15+ countries/regions including:
  - **Europe**: Hungary, Germany, France, UK, Spain, Italy, Scandinavia (Nordic), Eastern Europe (Slovakia, Romania, Bulgaria, Estonia, Latvia), Russia, Ukraine
  - **Asia-Pacific**: Japan, China, South Korea, India, Australia
  - **Americas**: USA, Brazil, Argentina
- **Grid/List Views**: Toggle between card grid and compact list layouts
- **Direct Links**: Quick access to developer websites and download pages

## Categories

| Category | Description |
|----------|-------------|
| Modeling | 3D modeling tools, parametric objects, terrain |
| Rendering | Real-time rendering, visualization engines |
| Analysis | Energy analysis, structural calculations, insolation |
| Library | Object libraries, BIM components, manufacturer catalogs |
| Productivity | Workflow automation, documentation tools |
| Import/Export | File format converters, interoperability tools |
| BIM | Building Information Modeling workflows |
| Visualization | Presentation, VR/AR, client walkthroughs |

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Clone the repository:
   ```bash
   git clone https://github.com/giza611/Archicad-Add-on-Repository.git
   cd Archicad-Add-on-Repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)

## Data Sources

Add-on information has been compiled from:
- Official Graphisoft downloads and partner pages
- Regional Graphisoft distributors (graphisoft.hu, graphisoft.de, graphisoft.fr, etc.)
- Developer websites (Cigraph, LabPP, eptar, Ci Tools, Nordic BIM Group, etc.)
- Manufacturer BIM portals (Wienerberger, Xella, Rigips, etc.)

## Contributing

To suggest new add-ons or corrections, please open an issue or submit a pull request with updates to the `src/constants.ts` file following the existing data structure.

## License

This project is for educational and reference purposes. All add-on names, logos, and trademarks belong to their respective owners.
