import fs from 'fs';
import path from 'path';
import { db } from './db';
import type { FileNode } from './types';

const WORKSPACES_ROOT = path.join(process.cwd(), 'data', 'workspaces');

// Ensure workspaces folder exists
if (!fs.existsSync(WORKSPACES_ROOT)) {
  fs.mkdirSync(WORKSPACES_ROOT, { recursive: true });
}

export interface ProjectRecord {
  id: string;
  userId: string;
  name: string;
  description: string;
  template: 'empty' | 'counter' | 'material3';
  framework: string;
  language: string;
  storagePath: string;
  flutterVersion: string;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt: string;
  archivedAt?: string | null;
}

export interface FileRecord {
  id: string;
  projectId: string;
  path: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
  size: number;
  updatedAt: string;
}

// ─── Template Code Definitions ────────────────────────────────────────────────

const COUNTER_APP_FILES: Record<string, string> = {
  'pubspec.yaml': `name: counter_app
description: "A counter application in Flutter."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`,
  'lib/main.dart': `import 'package:flutter/material.dart';

void main() {
  runApp(const KryptonCounterApp());
}

class KryptonCounterApp extends StatelessWidget {
  const KryptonCounterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Krypton Counter',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF3D8EF8),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const CounterHomePage(title: 'Krypton Cloud Counter'),
    );
  }
}

class CounterHomePage extends StatefulWidget {
  const CounterHomePage({super.key, required this.title});
  final String title;

  @override
  State<CounterHomePage> createState() => _CounterHomePageState();
}

class _CounterHomePageState extends State<CounterHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  void _resetCounter() {
    setState(() {
      _counter = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _resetCounter,
            tooltip: 'Reset count',
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFF13151A),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF252932)),
              ),
              child: Column(
                children: [
                  const Icon(Icons.touch_app, size: 48, color: Color(0xFF3D8EF8)),
                  const SizedBox(height: 16),
                  const Text(
                    'Button presses:',
                    style: TextStyle(fontSize: 16, color: Colors.white70),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '$_counter',
                    style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF3D8EF8),
                        ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        icon: const Icon(Icons.add),
        label: const Text('Increment'),
        backgroundColor: const Color(0xFF3D8EF8),
        foregroundColor: Colors.white,
      ),
    );
  }
}
`,
  'lib/widgets/custom_card.dart': `import 'package:flutter/material.dart';

class CustomCard extends StatelessWidget {
  final Widget child;
  const CustomCard({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF181B21),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF252932)),
      ),
      child: child,
    );
  }
}
`,
  'README.md': `# Krypton Counter App

A clean, modern Flutter counter application running in the Krypton Cloud IDE.

## Features
- Material 3 Design
- State management with \`setState\`
- Dark-first aesthetic
`,
};

const EMPTY_APP_FILES: Record<string, string> = {
  'pubspec.yaml': `name: empty_flutter_app
description: "A clean minimal starter Flutter project."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`,
  'lib/main.dart': `import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(useMaterial3: true),
      home: const Scaffold(
        body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.code, size: 48, color: Color(0xFF3D8EF8)),
              SizedBox(height: 16),
              Text(
                'Ready to Build',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
              ),
              SizedBox(height: 8),
              Text(
                'Ask Krypton AI to generate widgets, screens, or features.',
                style: TextStyle(color: Colors.white60),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`,
  'README.md': `# Empty Flutter App
Minimal Flutter project scaffold ready for custom UI creation.
`,
};

const MATERIAL3_APP_FILES: Record<string, string> = {
  'pubspec.yaml': `name: material3_app
description: "A showcase of Material 3 components in Flutter."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`,
  'lib/main.dart': `import 'package:flutter/material.dart';

void main() {
  runApp(const Material3ShowcaseApp());
}

class Material3ShowcaseApp extends StatefulWidget {
  const Material3ShowcaseApp({super.key});

  @override
  State<Material3ShowcaseApp> createState() => _Material3ShowcaseAppState();
}

class _Material3ShowcaseAppState extends State<Material3ShowcaseApp> {
  int _selectedIndex = 0;
  bool _isDark = true;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material 3 Krypton',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: const Color(0xFF3D8EF8),
        brightness: _isDark ? Brightness.dark : Brightness.light,
        useMaterial3: true,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Material 3 Hub'),
          actions: [
            IconButton(
              icon: Icon(_isDark ? Icons.light_mode : Icons.dark_mode),
              onPressed: () => setState(() => _isDark = !_isDark),
              tooltip: 'Toggle Theme',
            ),
          ],
        ),
        body: IndexedStack(
          index: _selectedIndex,
          children: const [
            DashboardView(),
            AnalyticsView(),
            ProfileView(),
          ],
        ),
        bottomNavigationBar: NavigationBar(
          selectedIndex: _selectedIndex,
          onDestinationSelected: (idx) => setState(() => _selectedIndex = idx),
          destinations: const [
            NavigationDestination(icon: Icon(Icons.dashboard_outlined), selectedIcon: Icon(Icons.dashboard), label: 'Home'),
            NavigationDestination(icon: Icon(Icons.insights_outlined), selectedIcon: Icon(Icons.insights), label: 'Analytics'),
            NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Account'),
          ],
        ),
      ),
    );
  }
}

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: const Color(0xFF3D8EF8).withOpacity(0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.bolt, color: Color(0xFF3D8EF8)),
                    ),
                    const SizedBox(width: 12),
                    const Text('Cloud Execution', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 12),
                const Text('Your Flutter code runs instantly inside isolated cloud runtimes.'),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class AnalyticsView extends StatelessWidget {
  const AnalyticsView({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Analytics View'));
  }
}

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Profile View'));
  }
}
`,
  'README.md': `# Material 3 App
Full Material 3 showcase with bottom navigation bar, dynamic theming, and responsive views.
`,
};

export function getTemplateFiles(template: 'empty' | 'counter' | 'material3'): Record<string, string> {
  switch (template) {
    case 'empty':
      return EMPTY_APP_FILES;
    case 'material3':
      return MATERIAL3_APP_FILES;
    case 'counter':
    default:
      return COUNTER_APP_FILES;
  }
}

// ─── Workspace Creation & Persistence ─────────────────────────────────────────

export function createProjectWorkspace(
  projectId: string,
  userId: string,
  name: string,
  description: string,
  template: 'empty' | 'counter' | 'material3' = 'counter'
): ProjectRecord {
  const projectDir = path.join(WORKSPACES_ROOT, projectId);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  const now = new Date().toISOString();
  const projectRecord: ProjectRecord = {
    id: projectId,
    userId,
    name,
    description: description || 'Flutter Application',
    template,
    framework: 'Flutter',
    language: 'Dart',
    storagePath: projectDir,
    flutterVersion: '3.22.0',
    createdAt: now,
    updatedAt: now,
    lastOpenedAt: now,
  };

  // Insert project record into database
  db.prepare(`
    INSERT INTO projects (id, userId, name, description, template, framework, language, storagePath, flutterVersion, createdAt, updatedAt, lastOpenedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    projectRecord.id,
    projectRecord.userId,
    projectRecord.name,
    projectRecord.description,
    projectRecord.template,
    projectRecord.framework,
    projectRecord.language,
    projectRecord.storagePath,
    projectRecord.flutterVersion,
    projectRecord.createdAt,
    projectRecord.updatedAt,
    projectRecord.lastOpenedAt
  );

  // Write template files to disk and DB
  const files = getTemplateFiles(template);
  const insertFile = db.prepare(`
    INSERT INTO project_files (id, projectId, path, name, type, content, size, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const [relPath, content] of Object.entries(files)) {
    const fullPath = path.join(projectDir, relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, 'utf-8');

    const fileId = `${projectId}_${relPath.replace(/\//g, '_')}`;
    const fileName = path.basename(relPath);
    insertFile.run(
      fileId,
      projectId,
      relPath,
      fileName,
      'file',
      content,
      Buffer.byteLength(content, 'utf8'),
      now
    );
  }

  return projectRecord;
}

// ─── Save File (Autosave) ─────────────────────────────────────────────────────

export function saveProjectFile(projectId: string, relPath: string, content: string): boolean {
  const project = db.prepare('SELECT storagePath FROM projects WHERE id = ?').get(projectId) as { storagePath: string } | undefined;
  if (!project) return false;

  const fullPath = path.join(project.storagePath, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write to disk
  fs.writeFileSync(fullPath, content, 'utf-8');

  // Write to database
  const now = new Date().toISOString();
  const fileId = `${projectId}_${relPath.replace(/\//g, '_')}`;
  const fileName = path.basename(relPath);

  db.prepare(`
    INSERT INTO project_files (id, projectId, path, name, type, content, size, updatedAt)
    VALUES (?, ?, ?, ?, 'file', ?, ?, ?)
    ON CONFLICT(projectId, path) DO UPDATE SET
      content = excluded.content,
      size = excluded.size,
      updatedAt = excluded.updatedAt
  `).run(
    fileId,
    projectId,
    relPath,
    fileName,
    content,
    Buffer.byteLength(content, 'utf8'),
    now
  );

  // Update project updatedAt timestamp
  db.prepare('UPDATE projects SET updatedAt = ? WHERE id = ?').run(now, projectId);

  return true;
}

// ─── Build File Tree for Frontend ─────────────────────────────────────────────

export function getProjectFileTree(projectId: string): FileNode[] {
  const rows = db.prepare(`
    SELECT path, name, type, size, updatedAt
    FROM project_files
    WHERE projectId = ?
    ORDER BY path ASC
  `).all(projectId) as Array<{ path: string; name: string; type: 'file' | 'directory'; size: number; updatedAt: string }>;

  const rootNodes: FileNode[] = [];
  const dirMap = new Map<string, FileNode>();

  // Ensure directories are recognized
  for (const row of rows) {
    const parts = row.path.split('/');
    let currentPath = '';

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const parentPath = currentPath;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!dirMap.has(currentPath)) {
        const dirNode: FileNode = {
          id: `${projectId}_dir_${currentPath.replace(/\//g, '_')}`,
          name: part,
          type: 'directory',
          path: currentPath,
          children: [],
        };
        dirMap.set(currentPath, dirNode);

        if (parentPath && dirMap.has(parentPath)) {
          dirMap.get(parentPath)!.children!.push(dirNode);
        } else if (!parentPath) {
          rootNodes.push(dirNode);
        }
      }
    }

    const fileNode: FileNode = {
      id: `${projectId}_${row.path.replace(/\//g, '_')}`,
      name: row.name,
      type: row.type,
      path: row.path,
      size: row.size,
      updatedAt: new Date(row.updatedAt),
    };

    const parentPath = parts.slice(0, -1).join('/');
    if (parentPath && dirMap.has(parentPath)) {
      dirMap.get(parentPath)!.children!.push(fileNode);
    } else {
      rootNodes.push(fileNode);
    }
  }

  return rootNodes;
}

// ─── Get Single File Content ──────────────────────────────────────────────────

export function getProjectFileContent(projectId: string, relPath: string): string | null {
  const row = db.prepare('SELECT content FROM project_files WHERE projectId = ? AND path = ?').get(projectId, relPath) as { content: string } | undefined;
  if (row && typeof row.content === 'string') {
    return row.content;
  }

  // Fallback to disk read
  const project = db.prepare('SELECT storagePath FROM projects WHERE id = ?').get(projectId) as { storagePath: string } | undefined;
  if (!project) return null;

  const fullPath = path.join(project.storagePath, relPath);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, 'utf-8');
  }

  return null;
}
