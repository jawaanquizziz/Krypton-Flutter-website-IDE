# Graph Report - C:\Users\Jawaan Santh\Desktop\Krypton  (2026-10-03)

## Corpus Check
- 30 files · ~17,678 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 130 nodes · 105 edges · 28 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]

## God Nodes (most connected - your core abstractions)
1. `Icon` - 3 edges
2. `[search, setSearch]` - 2 edges
3. `filtered` - 2 edges
4. `ICON_MAP` - 2 edges
5. `eslintConfig` - 1 edges
6. `nextConfig` - 1 edges
7. `config` - 1 edges
8. `metadata` - 1 edges
9. `NAV_LINKS` - 1 edges
10. `FEATURES` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
_Enables users to browse, filter, and select project templates based on categories, Flutter version, and search queries._
Cohesion: 0.16
Nodes (11): CATEGORIES, [category, setCategory], filtered, [flutterVersion, setFlutterVersion], Icon, ICON_MAP, [projectName, setProjectName], [search, setSearch] (+3 more)

### Community 1 - "Community 1"

Cohesion: 0.18
Nodes (9): ACTIONS, currentProvider, [generatingStage, setGeneratingStage], [input, setInput], { messages, currentAction, setAction, addMessage, contextFiles, isGenerating, setIsGenerating }, [open, setOpen], [pendingChanges, setPendingChanges], { selectedProviderId, selectedModel, setProvider, setModel } (+1 more)

### Community 2 - "Community 2"

Cohesion: 0.18
Nodes (8): bottomRef, [cmdHistory, setCmdHistory], COLORS, [historyIdx, setHistoryIdx], [input, setInput], inputRef, [lines, setLines], SUGGESTION_COMMANDS

### Community 3 - "Community 3"

Cohesion: 0.22
Nodes (7): activeTab, content, editorRef, handleMount, language, LANGUAGE_MAP, { tabs, activeTabId, getActiveContent, updateTabContent }

### Community 4 - "Community 4"

Cohesion: 0.22
Nodes (8): config, DEVICE_CONFIG, DEVICE_ICONS, DeviceIcon, { deviceTarget, setDeviceTarget, runStatus }, Icon, isMobile, [scale, setScale]

### Community 5 - "Community 5"

Cohesion: 0.29
Nodes (6): FEATURES, keywords, [mobileMenuOpen, setMobileMenuOpen], NAV_LINKS, PREVIEW_CODE, result

### Community 6 - "Community 6"

Cohesion: 0.29
Nodes (4): { expandedDirs, toggleDir, openFile, activeTabId, tabs }, { fileTree, activeProject }, isActive, isExpanded

### Community 7 - "Community 7"

Cohesion: 0.29
Nodes (5): { activeProject, runStatus, setRunStatus, deviceTarget, setDeviceTarget, togglePreview, toggleTerminal, toggleAI, showPreview, showTerminal, showAI }, DEVICE_OPTIONS, [deviceDropdown, setDeviceDropdown], DeviceIcon, [projectDropdown, setProjectDropdown]

### Community 8 - "Community 8"

Cohesion: 0.29
Nodes (6): MOCK_AI_PROVIDERS, MOCK_FILE_CONTENTS, MOCK_FILE_TREE, MOCK_PROJECTS, MOCK_TEMPLATES, MOCK_TERMINAL_LINES

### Community 9 - "Community 9"

Cohesion: 0.4
Nodes (2): [email, setEmail], [step, setStep]

### Community 10 - "Community 10"

Cohesion: 0.5
Nodes (2): isActive, { tabs, activeTabId, setActiveTab, closeTab }

### Community 11 - "Community 11"

Cohesion: 0.5
Nodes (3): defaultModel, defaultProvider, useAIStore

### Community 12 - "Community 12"
_Collects, stores, and exposes descriptive information about data assets for discovery, lineage, and governance purposes._
Cohesion: 0.67
Nodes (1): metadata

### Community 13 - "Community 13"
_Handles the current tab selection and permits updates to switch between tabs._
Cohesion: 0.67
Nodes (2): [activeTab, setActiveTab], TABS

### Community 14 - "Community 14"

Cohesion: 0.67
Nodes (2): { activeActivity, setActiveActivity }, ACTIVITIES

### Community 15 - "Community 15"

Cohesion: 0.67
Nodes (2): [active, setActive], TABS

### Community 16 - "Community 16"

Cohesion: 0.67
Nodes (2): { activeProject, runStatus, deviceTarget, tabs, activeTabId }, activeTab

### Community 17 - "Community 17"
_Defines the visual styles or themes for buttons across the user interface._
Cohesion: 0.67
Nodes (1): buttonVariants

### Community 18 - "Community 18"
_Specifies ESLint rules and settings for JavaScript code quality enforcement._
Cohesion: 1.0
Nodes (1): eslintConfig

### Community 19 - "Community 19"
_Defines build‑time and runtime settings for a Next.js application, such as environment variables, routing, and transpilation options._
Cohesion: 1.0
Nodes (1): nextConfig

### Community 20 - "Community 20"
_Handles application settings, deployment parameters, and environment-specific configurations._
Cohesion: 1.0
Nodes (1): config

### Community 21 - "Community 21"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"

Cohesion: 1.0
Nodes (1): { showPreview, showTerminal, showAI, activeActivity }

### Community 23 - "Community 23"

Cohesion: 1.0
Nodes (1): useIDEStore

### Community 24 - "Community 24"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
_Unable to determine domain due to missing code entities._
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **82 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `metadata`, `NAV_LINKS` (+77 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 18`** (2 nodes): `eslint.config.mjs`, `eslintConfig`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `next.config.ts`, `nextConfig`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `postcss.config.mjs`, `config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `providers.tsx`, `Providers()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `page.tsx`, `{ showPreview, showTerminal, showAI, activeActivity }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `ide-store.ts`, `useIDEStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `krypton-logo.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (1 nodes): `utils.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.