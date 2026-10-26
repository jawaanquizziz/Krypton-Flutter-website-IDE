# Krypton Frontend Foundation Prompt

You are building the frontend of **Krypton**, a professional
browser-based cloud IDE for Flutter and Dart.

Krypton is NOT a generic AI chatbot, AI dashboard, or ordinary SaaS
website.

It is intended to become a serious developer platform where students and
developers can create Flutter applications directly from the browser
without installing Flutter SDK, Dart SDK, Android Studio, or an
emulator.

## Current Scope

For this phase, build ONLY the frontend experience for Flutter/Dart
application development.

DO NOT build website-development functionality yet.

DO NOT implement real AI APIs, cloud execution, Docker, authentication,
databases, billing, or backend services yet.

However, structure the frontend so these systems can be connected later
without redesigning the application.

The interface should contain realistic frontend states and interaction
flows, but do not fake successful backend operations. Clearly structure
future API boundaries.

------------------------------------------------------------------------

## Tech Stack

Use:

-   Next.js 16
-   TypeScript
-   React 19
-   Tailwind CSS
-   shadcn/ui
-   Radix UI
-   Monaco Editor
-   Lucide React
-   Zustand
-   TanStack Query
-   xterm.js
-   ESLint
-   Prettier
-   Inter
-   JetBrains Mono

Use App Router.

Use strict TypeScript.

Use reusable React components.

Avoid unnecessary dependencies.

------------------------------------------------------------------------

## Product Design Direction

Krypton must look like a serious developer product.

Design inspiration can come from the quality and usability principles
of:

-   VS Code
-   GitHub
-   Linear
-   Vercel
-   Figma
-   modern professional developer tools

DO NOT copy their interfaces.

Create a distinctive Krypton design language.

The interface must feel:

-   professional
-   technical
-   mature
-   clean
-   precise
-   fast
-   trustworthy
-   developer-focused
-   information-dense without feeling cluttered

### Absolutely Avoid

Do not make Krypton look AI-generated.

Avoid:

-   excessive gradients
-   giant glowing elements
-   excessive glassmorphism
-   neon cyberpunk styling
-   random purple/blue gradient cards
-   floating blobs
-   excessive shadows
-   cartoon illustrations
-   generic AI robot graphics
-   oversized rounded cards
-   huge marketing sections inside the application
-   unnecessary animations
-   excessive pill-shaped buttons
-   decorative elements with no functional purpose
-   "AI-powered" repeated everywhere
-   fake statistics
-   fake testimonials
-   generic SaaS dashboard patterns

Krypton should look like software built by an experienced developer-tool
product team.

------------------------------------------------------------------------

## Visual System

Use a restrained dark-first developer-tool interface.

Primary application surface:

-   deep charcoal / near-black
-   slightly lighter panels
-   subtle borders
-   high-contrast text
-   muted secondary text

Use one restrained Krypton accent color for important actions.

Use semantic colors only where necessary:

-   green = success
-   red = error
-   yellow = warning
-   blue/purple = selected/interactive state

Do not use gradients as the primary visual language.

Borders should be subtle.

Corners should be moderately rounded, not excessively rounded.

Use an 8px spacing system.

Typography must have a clear hierarchy.

Use Inter for interface text.

Use JetBrains Mono for:

-   code
-   terminal
-   file paths
-   technical output

------------------------------------------------------------------------

## Krypton Brand

Product name:

**Krypton**

Logo should be simple and professional.

Do not create a cartoon mascot.

Use a minimal geometric symbol that can work at 16px, 24px and 32px.

The wordmark should be clean and understated.

------------------------------------------------------------------------

## Application Structure

Create the following main frontend areas:

1.  Landing page
2.  Sign-in page
3.  Projects dashboard
4.  New Project flow
5.  Templates
6.  Main IDE
7.  AI Assistant panel
8.  Settings
9.  Account / connected services UI

Backend functionality is NOT required yet.

------------------------------------------------------------------------

## Landing Page

Create a professional Krypton landing page.

Primary message:

> Build Flutter apps from your browser.

Supporting message should explain that Krypton provides a browser-based
Flutter/Dart development environment without local setup.

Primary CTA:

**Get Started**

Secondary CTA:

**View Demo**

Navigation:

-   Product
-   Templates
-   Pricing
-   Docs
-   Community
-   Sign In
-   Get Started

Keep the landing page restrained.

The IDE should be the visual centerpiece rather than abstract AI
artwork.

Show a realistic Krypton IDE preview.

------------------------------------------------------------------------

## Sign-in Page

Create a professional authentication screen.

Include:

-   Krypton logo
-   Continue with Google
-   email input
-   continue button
-   terms/privacy text

Design it as a real developer-product authentication experience.

DO NOT imply that Google login automatically grants access to paid
OpenAI, Claude, Gemini or other subscriptions.

Future provider connections should be handled separately through
authorized integrations.

------------------------------------------------------------------------

## Projects Dashboard

Create a desktop-first project dashboard.

### Sidebar

-   Projects
-   Templates
-   AI Assistant
-   Settings

### Main Area

-   Projects heading
-   New Project button
-   Search
-   Recent projects
-   Project cards/list
-   Last modified
-   Flutter version
-   Project status

Example projects:

-   student_app
-   attendance_system
-   portfolio_app
-   notes_app

Do not make cards excessively large.

Provide both grid/list-friendly architecture.

------------------------------------------------------------------------

## New Project Flow

Create a clean project creation interface.

Options:

-   Blank Flutter App
-   Flutter Starter
-   Student App
-   Dashboard App
-   Notes App
-   Authentication App

Each template should have:

-   icon
-   name
-   short description
-   Flutter/Dart indicator
-   Use Template button

Do not pretend the templates are actually being generated by a backend
yet.

------------------------------------------------------------------------

## Main IDE

This is the most important screen.

The IDE should feel like a real professional coding environment.

### Desktop Layout

``` text
----------------------------------------------------
Krypton | Project | Run | Preview | Share | Account
----------------------------------------------------
Activity | Explorer | Editor | Preview | AI
----------------------------------------------------
        |         |         |
        |         |         |
        |         |         |
----------------------------------------------------
                 Terminal
----------------------------------------------------
```

### Top Bar

Include:

-   Krypton logo
-   current project
-   project switcher
-   Run
-   Stop
-   device/browser selector
-   Preview
-   Share
-   account avatar

### Left Activity Bar

Icons for:

-   Explorer
-   Search
-   Source Control
-   Run/Debug
-   Extensions
-   Settings

### Explorer

Show a realistic Flutter project:

``` text
lib/
  main.dart
  home.dart
  widgets/
  services/

assets/
  images/

test/

pubspec.yaml
README.md
```

### Editor

Use Monaco Editor.

Show realistic Dart/Flutter code.

Include:

-   tabs
-   line numbers
-   syntax highlighting
-   active file
-   breadcrumbs
-   minimap option
-   editor actions

The editor must visually resemble a professional code editor, not a
textarea.

### Preview

Create a realistic Flutter application preview.

Include device controls:

-   mobile
-   tablet
-   desktop

Include refresh/reload controls.

Show a realistic Flutter UI inside the preview.

### Terminal

Create a professional terminal panel using xterm.js styling.

Show realistic commands such as:

``` text
flutter pub get
flutter analyze
flutter build web
```

Do not claim these commands actually executed yet.

------------------------------------------------------------------------

## AI Assistant

Create an integrated AI panel.

It should feel like a developer assistant, NOT a chatbot website.

Header:

**AI Assistant**

Model selector:

-   Claude
-   GPT
-   Gemini
-   Bedrock

The UI should be designed so the actual provider integration can be
connected later.

Include actions:

-   Generate
-   Edit
-   Explain
-   Debug
-   Refactor
-   Review

Example prompt:

> Create a student attendance dashboard.

The assistant should display a professional coding workflow:

``` text
Understanding request
        ↓
Planning changes
        ↓
Files to modify
        ↓
Generated changes
        ↓
Review changes
```

Include:

-   Apply Changes
-   Reject

The AI should have project/file context indicators.

Example:

``` text
Context:
main.dart
home.dart
pubspec.yaml
```

DO NOT make the AI panel visually dominate the IDE.

The code editor remains the primary workspace.

------------------------------------------------------------------------

## Mobile Experience

The application must be responsive.

DO NOT simply shrink the desktop IDE.

For mobile, switch between focused workspace modes:

-   Files
-   Code
-   Preview
-   AI
-   Terminal

Use bottom navigation or a compact workspace switcher.

The mobile interface must support:

-   320px
-   375px
-   390px
-   430px

Desktop:

-   1024px
-   1280px
-   1440px
-   1920px

Avoid horizontal page scrolling.

Respect mobile safe areas.

Make controls touch-friendly.

------------------------------------------------------------------------

## Settings

Create a professional settings page.

Sections:

-   Account
-   AI Models
-   Preferences
-   Editor
-   Appearance
-   Keyboard Shortcuts
-   Connected Accounts

For future AI providers, show:

-   OpenAI
-   Anthropic
-   Google
-   Amazon Bedrock

Use states such as:

-   Not connected
-   Connected
-   Manage

Do not expose API keys in the UI.

Do not claim that a Google login gives access to a user's paid AI
subscriptions.

------------------------------------------------------------------------

## Component Architecture

Create reusable components such as:

-   AppShell
-   Sidebar
-   TopBar
-   ActivityBar
-   ProjectCard
-   ProjectList
-   TemplateCard
-   EditorTabs
-   CodeEditor
-   PreviewPanel
-   TerminalPanel
-   AIAssistant
-   ModelSelector
-   FileExplorer
-   StatusBar
-   CommandPalette
-   SettingsLayout
-   MobileWorkspaceSwitcher

Avoid putting the entire application into one component.

------------------------------------------------------------------------

## Frontend Architecture

Organize the code cleanly.

Suggested structure:

``` text
app/
components/
  layout/
  projects/
  templates/
  ide/
  ai/
  settings/
  ui/

lib/
hooks/
stores/
types/
config/
```

Keep business logic separate from presentation.

Create typed interfaces for future:

-   Project
-   File
-   AIModel
-   AIProvider
-   Workspace
-   Build
-   TerminalSession
-   User

Do not hard-code architecture that will block future backend
integration.

------------------------------------------------------------------------

## Future Backend Boundaries

Prepare interfaces for:

-   Authentication
-   Projects API
-   File storage
-   AI Gateway
-   Build service
-   Terminal service
-   Preview service
-   Extension system
-   Billing

But DO NOT implement those backend services now.

The frontend should be ready to connect to APIs later.

------------------------------------------------------------------------

## Quality Requirements

Before finishing:

-   Run TypeScript checks.
-   Run ESLint.
-   Run the production build.
-   Fix all errors.
-   Remove unused imports.
-   Remove placeholder lorem ipsum.
-   Check all responsive layouts.
-   Ensure buttons and navigation work.
-   Ensure no broken routes.
-   Ensure no console errors.
-   Ensure the UI looks consistent across pages.

Do not generate fake backend functionality just to make the interface
appear functional.

Build a high-quality frontend foundation that can become the real
Krypton product.

The final result should look like a serious developer platform that
could realistically be launched as a commercial product.

------------------------------------------------------------------------

## Development Order

Build in this order:

1.  Design system
2.  Landing page
3.  Authentication UI
4.  Projects dashboard
5.  New Project flow
6.  Templates
7.  Main IDE
8.  AI Assistant
9.  Mobile workspace
10. Settings
11. Final responsive and accessibility audit

The **IDE is the highest-priority screen**.

Do not spend disproportionate effort on marketing pages while the actual
coding workspace is weak.
