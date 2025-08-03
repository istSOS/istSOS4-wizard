# istSOS4 Configurator Desktop Application

A desktop application for configuring istSOS4 server instances, built with Electron and React.

## 🚀 Quick Start

### Development Mode

```bash
npm run electron-dev
```

### Production Build

```bash
# Build for current platform
npm run dist

# Platform-specific builds
npm run dist:win    # Windows installer
npm run dist:mac    # macOS DMG
npm run dist:linux  # Linux AppImage
```

## 📁 Project Structure

```
istsos4-wizard/
├── electron/
│   ├── main.js          # Main Electron process
│   └── preload.js       # Preload script for security
├── src/                 # React application source
├── public/              # Static assets
├── dist/                # Built web application
├── dist-electron/       # Built desktop application
├── package.json         # Dependencies and scripts
```

## 🛠 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build React app for production
- `npm run electron` - Run Electron with built app
- `npm run electron-dev` - Run Electron with dev server
- `npm run dist` - Create distributable packages for current platform
- `npm run dist:win` - Build Windows installer (NSIS)
- `npm run dist:mac` - Build macOS DMG package
- `npm run dist:linux` - Build Linux AppImage package

## 📦 Distribution

The build process creates platform-specific installers:

### Windows

- **Installer**: `istSOS4 Configurator Setup 1.0.0.exe` (NSIS installer)
- **Portable**: `win-unpacked/` folder with portable application

### macOS

- **DMG**: `istSOS4 Configurator-1.0.0.dmg` (macOS disk image)
- **Portable**: `mac/` folder with .app bundle

### Linux

- **AppImage**: `istSOS4 Configurator-1.0.0.AppImage` (portable Linux executable)
- **Portable**: `linux-unpacked/` folder with application files

**Note**: Cross-platform building requires the target platform for code signing and notarization.

## 🎯 Features

### Desktop Integration

- Native application menus
- File import/export dialogs
- System notifications
- Auto-save configuration
- Window controls

### Configuration Management

- Multi-step wizard interface
- Real-time validation
- Progress tracking
- Session recovery

### Supported Platforms

- **Windows**: Windows 10/11 (x64)
- **macOS**: macOS 10.15+ (Intel & Apple Silicon)
- **Linux**: Ubuntu 18.04+, Fedora 28+, Debian 10+ (x64)

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run electron-dev`

### Building

**For current platform:**

```bash
npm run build  # Build React app
npm run dist   # Create installer
```

**For specific platforms:**

```bash
npm run dist:win    # Windows (works on any OS)
npm run dist:mac    # macOS (requires macOS for signing)
npm run dist:linux  # Linux (works on any OS)
```

**Platform-specific notes:**

- **Windows**: Use PowerShell or Command Prompt
- **macOS**: Requires Xcode Command Line Tools
- **Linux**: Requires build-essential package

## 📋 Configuration Steps

1. **Welcome** - Introduction and overview
2. **Basic Server** - Server details and connection
3. **Database** - PostgreSQL configuration
4. **Authorization** - Authentication settings
5. **Services** - Coordinate systems
6. **Data Management** - Data policies
7. **Performance** - Optimization settings
8. **Simple Data** - Test data generation
9. **Review** - Configuration summary
10. **Completion** - Final setup

## 🔒 Security

- Context isolation enabled
- Node integration disabled
- Secure preload scripts
- External link protection

## 📄 License

[Add your license information here]

## 🤝 Contributing

[Add contribution guidelines here]

## 📞 Support

For issues and questions:

- GitHub Issues: [repository-url]
- Documentation: [docs-url]
- Email: info@istsos.org
