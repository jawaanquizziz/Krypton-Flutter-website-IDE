'use client';

import React from 'react';
import { Play, Folder, FileCode, Smartphone, ChevronDown, ChevronRight } from 'lucide-react';

export function EditorPreview() {
  return (
    <div className="relative w-full max-w-2xl select-none">
      {/* Subtle ambient back-glow behind IDE */}
      <div 
        className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#176BFF]/15 via-[#38A5FF]/10 to-transparent blur-2xl opacity-60" 
        aria-hidden="true"
      />

      {/* Main IDE Window Frame */}
      <div className="relative rounded-xl border border-[#1E293B] bg-[#0B1220] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] overflow-hidden">
        
        {/* Top Window Title / Control Bar */}
        <div className="flex h-10 items-center justify-between border-b border-[#1E293B] bg-[#070B14] px-4">
          {/* macOS Traffic Lights + Active Tab */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#EF4444]/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#EAB308]/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#22C55E]/80 inline-block" />
            </div>

            {/* Active Tab */}
            <div className="ml-2 flex items-center gap-2 rounded-t-md border-t-2 border-[#38A5FF] bg-[#0B1220] px-3.5 py-1.5 text-xs font-mono font-medium text-[#F8FAFC]">
              <FileCode className="h-3.5 w-3.5 text-[#38A5FF]" />
              <span>main.dart</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-[#94A3B8]/60 hover:text-[#94A3B8]">
              <span>pubspec.yaml</span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-md border border-[#1E293B] bg-[#0B1220] px-2.5 py-1 text-[11px] font-mono text-[#94A3B8]">
              <Smartphone className="h-3 w-3 text-[#38A5FF]" />
              <span>Pixel 8</span>
            </div>

            {/* Run Button */}
            <div className="flex items-center gap-1 rounded-md bg-[#176BFF] px-3 py-1 text-xs font-medium text-white shadow-sm shadow-[#176BFF]/30">
              <Play className="h-3 w-3 fill-current" />
              <span>Run</span>
            </div>
          </div>
        </div>

        {/* Workbench Body: Explorer + Code Editor */}
        <div className="grid grid-cols-12 min-h-[310px]">
          
          {/* Left Mini File Explorer */}
          <div className="col-span-4 sm:col-span-3 border-r border-[#1E293B] bg-[#070B14]/80 p-3 text-xs font-mono">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]/60 mb-2.5 px-1">
              Explorer
            </div>
            
            <div className="space-y-1">
              {/* Project Root */}
              <div className="flex items-center gap-1.5 text-[#F8FAFC] font-semibold px-1 py-0.5">
                <ChevronDown className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span>krypton_app</span>
              </div>

              {/* Lib folder */}
              <div className="pl-3 space-y-1 text-[#94A3B8]">
                <div className="flex items-center gap-1.5 text-[#F8FAFC]">
                  <ChevronDown className="h-3 w-3 text-[#38A5FF]" />
                  <Folder className="h-3.5 w-3.5 text-[#38A5FF] fill-[#38A5FF]/20" />
                  <span className="font-medium">lib</span>
                </div>

                {/* Sub-items in lib */}
                <div className="pl-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#38A5FF] bg-[#176BFF]/10 rounded px-1.5 py-0.5 font-medium">
                    <FileCode className="h-3 w-3" />
                    <span>main.dart</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#94A3B8] px-1.5 py-0.5 hover:text-[#F8FAFC]">
                    <ChevronRight className="h-3 w-3 text-[#94A3B8]/60" />
                    <Folder className="h-3 w-3" />
                    <span>pages</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#94A3B8] px-1.5 py-0.5 hover:text-[#F8FAFC]">
                    <ChevronRight className="h-3 w-3 text-[#94A3B8]/60" />
                    <Folder className="h-3 w-3" />
                    <span>widgets</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-1.5 py-0.5 text-[#94A3B8]/80 hover:text-[#F8FAFC]">
                  <ChevronRight className="h-3 w-3 text-[#94A3B8]/60" />
                  <Folder className="h-3 w-3" />
                  <span>assets</span>
                </div>
                <div className="flex items-center gap-1.5 px-1.5 py-0.5 text-[#94A3B8]/80 hover:text-[#F8FAFC]">
                  <FileCode className="h-3 w-3 text-[#94A3B8]/60" />
                  <span>pubspec.yaml</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Code Area with Dart Syntax Highlighting */}
          <div className="col-span-8 sm:col-span-9 bg-[#0B1220] p-4 text-[12px] font-mono leading-relaxed overflow-hidden">
            <div className="flex gap-4">
              {/* Line Numbers */}
              <div 
                className="select-none text-right font-mono text-xs text-[#94A3B8]/40 space-y-1 border-r border-[#1E293B] pr-3 shrink-0" 
                aria-hidden="true"
              >
                {Array.from({ length: 13 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code Content */}
              <div className="space-y-1 overflow-x-auto text-[#F8FAFC]">
                <div>
                  <span className="text-[#A855F7]">import</span>{' '}
                  <span className="text-[#34D399]">&apos;package:flutter/material.dart&apos;</span>;
                </div>
                <div className="text-transparent select-none">-</div>
                <div>
                  <span className="text-[#38A5FF]">void</span>{' '}
                  <span className="text-[#FBBF24]">main</span>() &#123;
                </div>
                <div className="pl-4">
                  <span className="text-[#FBBF24]">runApp</span>(
                  <span className="text-[#A855F7]">const</span>{' '}
                  <span className="text-[#60A5FA]">KryptonApp</span>());
                </div>
                <div>&#125;</div>
                <div className="text-transparent select-none">-</div>
                <div>
                  <span className="text-[#38A5FF]">class</span>{' '}
                  <span className="text-[#60A5FA]">KryptonApp</span>{' '}
                  <span className="text-[#38A5FF]">extends</span>{' '}
                  <span className="text-[#60A5FA]">StatelessWidget</span> &#123;
                </div>
                <div className="pl-4">
                  <span className="text-[#A855F7]">const</span>{' '}
                  <span className="text-[#60A5FA]">KryptonApp</span>(&#123;
                  <span className="text-[#A855F7]">super</span>.key&#125;);
                </div>
                <div className="text-transparent select-none">-</div>
                <div className="pl-4">
                  <span className="text-[#94A3B8]/60">{'// Real-time Flutter compilation in browser'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#38A5FF]">@override</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#60A5FA]">Widget</span>{' '}
                  <span className="text-[#FBBF24]">build</span>(
                  <span className="text-[#60A5FA]">BuildContext</span> context) &#123;
                </div>
                <div className="pl-8 text-[#94A3B8]">
                  <span className="text-[#A855F7]">return</span>{' '}
                  <span className="text-[#60A5FA]">MaterialApp</span>(title:{' '}
                  <span className="text-[#34D399]">&apos;Krypton&apos;</span>, home:{' '}
                  <span className="text-[#60A5FA]">Dashboard</span>());
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Editor Bottom Status Bar */}
        <div className="flex h-6 items-center justify-between border-t border-[#1E293B] bg-[#070B14] px-3 text-[10px] font-mono text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#34D399]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] inline-block animate-pulse" />
              Flutter 3.22.0 Ready
            </span>
            <span>Dart 3.4.0</span>
          </div>
          <div className="flex items-center gap-3">
            <span>UTF-8</span>
            <span>Ln 12, Col 24</span>
          </div>
        </div>

      </div>

      {/* Floating Realistic Device Simulator (Overlapping the IDE cleanly on large viewports) */}
      <div 
        className="hidden md:flex absolute -right-6 -bottom-6 w-[170px] h-[300px] rounded-[30px] border-[3px] border-[#1E293B] bg-[#070B14] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex-col items-center justify-between p-3.5 z-10"
        aria-label="Flutter Mobile Preview Simulator"
      >
        {/* Dynamic Island / Speaker Notch */}
        <div className="h-3 w-16 rounded-full bg-[#0B1220] border border-[#1E293B]" />

        {/* Running App Display */}
        <div className="w-full my-auto flex flex-col items-center text-center space-y-2.5">
          <div className="h-10 w-10 rounded-xl bg-[#176BFF]/15 border border-[#38A5FF]/30 flex items-center justify-center">
            <FlutterLogo size={22} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#F8FAFC]">Welcome to Krypton</div>
            <div className="text-[9px] text-[#94A3B8] mt-0.5">Your Flutter app, in the cloud</div>
          </div>
          <div className="w-full px-2">
            <div className="h-6 rounded bg-[#176BFF] text-white text-[9px] font-semibold flex items-center justify-center shadow-sm shadow-[#176BFF]/40">
              Get Started
            </div>
          </div>
        </div>

        {/* Home Bar Indicator */}
        <div className="h-1 w-12 rounded-full bg-[#94A3B8]/40" />
      </div>

    </div>
  );
}

function FlutterLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14.3 2L4 12.3L7.2 15.5L20.7 2H14.3Z" fill="#38A5FF" />
      <path d="M14.3 12.3L9.6 17L12.8 20.2L20.7 12.3H14.3Z" fill="#176BFF" />
      <path d="M9.6 17L7.2 14.6L4 17.8L6.4 20.2L9.6 17Z" fill="#0D47A1" />
    </svg>
  );
}
