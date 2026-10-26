import type {
  Project,
  FileNode,
  Template,
  AIProvider,
  AIModel,
  TerminalLine,
} from './types';

// ─── Mock Projects ────────────────────────────────────────────────────────────

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'student_app',
    description: 'Student attendance and grade tracking app',
    flutterVersion: '3.22.0',
    status: 'idle',
    lastModified: new Date('2026-10-02T14:30:00'),
    createdAt: new Date('2026-09-15T09:00:00'),
    ownerId: 'user-1',
    templateId: 'tpl-student',
  },
  {
    id: 'proj-2',
    name: 'attendance_system',
    description: 'QR-based attendance management system',
    flutterVersion: '3.22.0',
    status: 'idle',
    lastModified: new Date('2026-10-01T11:20:00'),
    createdAt: new Date('2026-09-20T10:00:00'),
    ownerId: 'user-1',
  },
  {
    id: 'proj-3',
    name: 'portfolio_app',
    description: 'Personal developer portfolio with dark theme',
    flutterVersion: '3.19.6',
    status: 'idle',
    lastModified: new Date('2026-09-28T16:45:00'),
    createdAt: new Date('2026-09-01T08:00:00'),
    ownerId: 'user-1',
  },
  {
    id: 'proj-4',
    name: 'notes_app',
    description: 'Markdown-aware notes with local storage',
    flutterVersion: '3.22.0',
    status: 'idle',
    lastModified: new Date('2026-09-25T09:15:00'),
    createdAt: new Date('2026-08-20T12:00:00'),
    ownerId: 'user-1',
    templateId: 'tpl-notes',
  },
];

// ─── Mock File Tree ───────────────────────────────────────────────────────────

export const MOCK_FILE_TREE: FileNode[] = [
  {
    id: 'lib',
    name: 'lib',
    path: 'lib',
    type: 'directory',
    children: [
      {
        id: 'lib/main.dart',
        name: 'main.dart',
        path: 'lib/main.dart',
        type: 'file',
        language: 'dart',
      },
      {
        id: 'lib/home.dart',
        name: 'home.dart',
        path: 'lib/home.dart',
        type: 'file',
        language: 'dart',
      },
      {
        id: 'lib/widgets',
        name: 'widgets',
        path: 'lib/widgets',
        type: 'directory',
        children: [
          {
            id: 'lib/widgets/app_button.dart',
            name: 'app_button.dart',
            path: 'lib/widgets/app_button.dart',
            type: 'file',
            language: 'dart',
          },
          {
            id: 'lib/widgets/student_card.dart',
            name: 'student_card.dart',
            path: 'lib/widgets/student_card.dart',
            type: 'file',
            language: 'dart',
          },
        ],
      },
      {
        id: 'lib/services',
        name: 'services',
        path: 'lib/services',
        type: 'directory',
        children: [
          {
            id: 'lib/services/api_service.dart',
            name: 'api_service.dart',
            path: 'lib/services/api_service.dart',
            type: 'file',
            language: 'dart',
          },
        ],
      },
    ],
  },
  {
    id: 'assets',
    name: 'assets',
    path: 'assets',
    type: 'directory',
    children: [
      {
        id: 'assets/images',
        name: 'images',
        path: 'assets/images',
        type: 'directory',
        children: [],
      },
    ],
  },
  {
    id: 'test',
    name: 'test',
    path: 'test',
    type: 'directory',
    children: [
      {
        id: 'test/widget_test.dart',
        name: 'widget_test.dart',
        path: 'test/widget_test.dart',
        type: 'file',
        language: 'dart',
      },
    ],
  },
  {
    id: 'pubspec.yaml',
    name: 'pubspec.yaml',
    path: 'pubspec.yaml',
    type: 'file',
    language: 'yaml',
  },
  {
    id: 'README.md',
    name: 'README.md',
    path: 'README.md',
    type: 'file',
    language: 'markdown',
  },
];

// ─── Mock File Contents ───────────────────────────────────────────────────────

export const MOCK_FILE_CONTENTS: Record<string, string> = {
  'lib/main.dart': `import 'package:flutter/material.dart';
import 'home.dart';

void main() {
  runApp(const StudentApp());
}

class StudentApp extends StatelessWidget {
  const StudentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Student App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF3D8EF8),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
        fontFamily: 'Inter',
      ),
      home: const HomePage(),
    );
  }
}`,
  'lib/home.dart': `import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Dashboard'),
        backgroundColor: Theme.of(context).colorScheme.surface,
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: const [
          AttendanceView(),
          GradesView(),
          ProfileView(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (i) => setState(() => _selectedIndex = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.checklist), label: 'Attendance'),
          NavigationDestination(icon: Icon(Icons.grade), label: 'Grades'),
          NavigationDestination(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}`,
  'pubspec.yaml': `name: student_app
description: A student attendance and grade tracking application.
version: 1.0.0+1
publish_to: 'none'

environment:
  sdk: '>=3.3.0 <4.0.0'
  flutter: '>=3.22.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6
  provider: ^6.1.2
  shared_preferences: ^2.3.1
  http: ^1.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
  fonts:
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter-Regular.ttf
        - asset: assets/fonts/Inter-Medium.ttf
          weight: 500
        - asset: assets/fonts/Inter-SemiBold.ttf
          weight: 600`,
};

// ─── Mock Templates ───────────────────────────────────────────────────────────

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 'tpl-blank',
    name: 'Blank Flutter App',
    description: 'A minimal Flutter app with Material 3. Clean slate.',
    icon: 'Square',
    category: 'blank',
    flutterVersion: '3.22.0',
    tags: ['minimal', 'material3'],
  },
  {
    id: 'tpl-starter',
    name: 'Flutter Starter',
    description: 'Counter app with routing, theming and state management set up.',
    icon: 'Zap',
    category: 'starter',
    flutterVersion: '3.22.0',
    tags: ['starter', 'riverpod', 'routing'],
  },
  {
    id: 'tpl-student',
    name: 'Student App',
    description: 'Dashboard with attendance tracking, grades, and notifications.',
    icon: 'GraduationCap',
    category: 'feature',
    flutterVersion: '3.22.0',
    tags: ['education', 'dashboard'],
  },
  {
    id: 'tpl-dashboard',
    name: 'Dashboard App',
    description: 'Data dashboard with charts, stats cards and a sidebar layout.',
    icon: 'LayoutDashboard',
    category: 'feature',
    flutterVersion: '3.22.0',
    tags: ['dashboard', 'charts', 'analytics'],
  },
  {
    id: 'tpl-notes',
    name: 'Notes App',
    description: 'Markdown notes with local persistence and search.',
    icon: 'NotebookPen',
    category: 'feature',
    flutterVersion: '3.22.0',
    tags: ['notes', 'markdown', 'storage'],
  },
  {
    id: 'tpl-auth',
    name: 'Authentication App',
    description: 'Login, register and profile screens with form validation.',
    icon: 'ShieldCheck',
    category: 'feature',
    flutterVersion: '3.22.0',
    tags: ['auth', 'forms', 'validation'],
  },
];

// ─── Mock AI Providers ────────────────────────────────────────────────────────

export const MOCK_AI_PROVIDERS: AIProvider[] = [
  {
    id: 'claude',
    name: 'Anthropic Claude',
    status: 'not_connected',
    models: [
      { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', providerId: 'claude', contextWindow: 200000 },
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', providerId: 'claude', contextWindow: 200000 },
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    status: 'not_connected',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', providerId: 'openai', contextWindow: 128000 },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', providerId: 'openai', contextWindow: 128000 },
    ],
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    status: 'not_connected',
    models: [
      { id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', providerId: 'gemini', contextWindow: 1000000 },
      { id: 'gemini-2-pro', name: 'Gemini 2.0 Pro', providerId: 'gemini', contextWindow: 1000000 },
    ],
  },
];

// ─── Mock Terminal Output ─────────────────────────────────────────────────────

export const MOCK_TERMINAL_LINES: TerminalLine[] = [
  {
    id: 't1',
    content: '$ flutter pub get',
    type: 'command',
    timestamp: new Date(),
  },
  {
    id: 't2',
    content: 'Resolving dependencies...',
    type: 'output',
    timestamp: new Date(),
  },
  {
    id: 't3',
    content: '+ cupertino_icons 1.0.6',
    type: 'output',
    timestamp: new Date(),
  },
  {
    id: 't4',
    content: '+ provider 6.1.2',
    type: 'output',
    timestamp: new Date(),
  },
  {
    id: 't5',
    content: '+ shared_preferences 2.3.1',
    type: 'output',
    timestamp: new Date(),
  },
  {
    id: 't6',
    content: 'Got dependencies!',
    type: 'info',
    timestamp: new Date(),
  },
  {
    id: 't7',
    content: '$ flutter analyze',
    type: 'command',
    timestamp: new Date(),
  },
  {
    id: 't8',
    content: 'Analyzing student_app...',
    type: 'output',
    timestamp: new Date(),
  },
  {
    id: 't9',
    content: 'No issues found! (ran in 2.3s)',
    type: 'info',
    timestamp: new Date(),
  },
];
