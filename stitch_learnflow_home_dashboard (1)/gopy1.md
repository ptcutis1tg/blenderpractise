<!-- LearnFlow - Minimalist Home Dashboard -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="web_dashboard" name="shell-type"/>
<title>LearnFlow</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; }
    }
    ::-webkit-scrollbar { display: none; }
  </style>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          fontFamily: {
            sans: ["Plus Jakarta Sans", "sans-serif"],
            display: ["Space Grotesk", "sans-serif"],
          }
        }
      }
    };
  </script>
</head>
<body class="bg-[#0B0F19] font-sans text-[#F9FAFB] antialiased">
<!-- Left Sidebar (Fixed 220px) -->
<aside class="fixed left-0 top-0 h-full w-[220px] bg-[#0B0F19] border-r border-[#1F2937] z-50 flex flex-col py-5">
<div class="px-5 mb-8 flex items-center gap-2.5">
<img alt="LearnFlow Icon" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_ZqfM9u0ori5oVju14WYocOCaiXZVA5inVVy24JirbP6fchJPCC9g_cVR00tMhMlVQWN-5ctsLYuHW831xj7_a69EhVNZ3yg2MPszbExeXuOp7PcQlDCKRpRM3d0sQmENCF8XNt9qw1YHCq16aT0Xx-Y3O9LtQKkDZ73lqtYKeA-ABxtVPhbqks7rP6BXFkehxD3Zh-FnD1V4IhVB_BwhCuFPH3sWGCXkzph90k"/>
<span class="font-display font-bold text-lg text-[#F9FAFB] tracking-tight">LearnFlow</span>
</div>
<nav class="flex-1 px-3 space-y-1">
<a aria-current="page" class="flex items-center gap-3 px-3 py-2 rounded-[10px] bg-[#6366F1] text-white font-medium text-sm transition-colors" data-path="home" href="#">
<span class="material-symbols-outlined text-[19px]">home</span>
<span>Home</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="search" href="#">
<span class="material-symbols-outlined text-[19px]">search</span>
<span>Search</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="my-roadmaps" href="#">
<span class="material-symbols-outlined text-[19px]">school</span>
<span>My Roadmaps</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="settings" href="#">
<span class="material-symbols-outlined text-[19px]">settings</span>
<span>Settings</span>
</a>
</nav>
<div class="px-3 mt-auto">
<div class="bg-[#111827] border border-[#1F2937] rounded-[10px] px-3 py-2.5 flex items-center justify-between text-xs font-medium">
<span class="text-[#F9FAFB] flex items-center gap-1.5">🔥 12d</span>
<span class="text-[#9CA3AF] flex items-center gap-1.5">🟢 Ollama</span>
</div>
</div>
</aside>
<!-- Main Content Area -->
<div class="pl-[220px] min-h-screen flex flex-col">
<!-- Top Header Bar (Height 48px) -->
<header class="fixed top-0 left-[220px] right-0 h-12 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1F2937] z-40 px-6 flex items-center justify-between">
<!-- Left: Search Trigger Pill -->
<button class="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] px-3 py-1 rounded-[10px] flex items-center gap-2 text-xs font-medium transition-colors" id="quick-search-btn" type="button">
<span class="material-symbols-outlined text-[15px]">search</span>
<span>⌘K Search...</span>
</button>
<!-- Right: Actions + Native Windows Controls -->
<div class="flex items-center gap-3">
<button aria-label="Edit" class="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] p-1.5 rounded-[10px] flex items-center justify-center transition-colors" title="Edit" type="button">
<span class="material-symbols-outlined text-[16px]">edit</span>
</button>
<div class="relative">
<button class="bg-[#6366F1] hover:bg-[#5558E6] text-white px-3 py-1.5 rounded-[10px] text-xs font-semibold flex items-center gap-1 transition-colors" id="new-roadmap-btn" type="button">
<span>+ New Roadmap</span>
<span class="material-symbols-outlined text-[15px]">expand_more</span>
</button>
<div class="hidden absolute right-0 mt-1.5 w-44 bg-[#111827] border border-[#1F2937] rounded-[10px] shadow-xl py-1 z-50" id="new-roadmap-menu">
<button class="w-full text-left px-3 py-2 text-xs font-medium text-[#F9FAFB] hover:bg-[#1F2937] flex items-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-[#6366F1]">edit_note</span>
<span>Manual</span>
</button>
<button class="w-full text-left px-3 py-2 text-xs font-medium text-[#F9FAFB] hover:bg-[#1F2937] flex items-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-[#10B981]">auto_awesome</span>
<span>AI Generate</span>
</button>
</div>
</div>
<!-- Native Windows Title Bar Controls -->
<div class="flex items-center ml-2 pl-3 border-l border-[#1F2937] text-[#9CA3AF]">
<button aria-label="Minimize" class="w-8 h-7 flex items-center justify-center hover:bg-[#1F2937] hover:text-[#F9FAFB] rounded text-xs transition-colors" type="button">—</button>
<button aria-label="Maximize" class="w-8 h-7 flex items-center justify-center hover:bg-[#1F2937] hover:text-[#F9FAFB] rounded text-xs transition-colors" type="button">□</button>
<button aria-label="Close" class="w-8 h-7 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 rounded text-xs transition-colors" type="button">✕</button>
</div>
</div>
</header>
<!-- Main Workspace -->
<main class="pt-12 flex-1 px-8 py-7 max-w-[1220px] w-full mx-auto">
<!-- Resume Learning Banner -->
<section class="bg-[#111827] border border-[#1F2937] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
<div class="flex-1 min-w-0">
<div class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6366F1] mb-1.5">
<span class="w-1.5 h-1.5 rounded-full bg-[#6366F1]"></span>
<span>Resume Learning</span>
</div>
<h1 class="font-display font-bold text-xl text-[#F9FAFB] truncate">Python for Data Analysis</h1>
<p class="text-sm text-[#9CA3AF] mt-1">Lesson 3.2: Filtering &amp; Grouping</p>
<div class="mt-4 max-w-xl">
<div class="flex items-center justify-between text-xs font-medium mb-1.5">
<span class="text-[#9CA3AF]">17/25 finished</span>
<span class="text-[#10B981] font-semibold">68%</span>
</div>
<div class="w-full h-2 bg-[#1F2937] rounded-full overflow-hidden">
<div class="h-full bg-[#10B981] rounded-full transition-all duration-500" style="width: 68%;"></div>
</div>
</div>
</div>
<div class="shrink-0">
<button class="bg-[#6366F1] hover:bg-[#5558E6] text-white px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-colors inline-flex items-center gap-2" type="button">
<span>Resume Lesson →</span>
</button>
</div>
</section>
<!-- My Roadmaps Grid -->
<section class="mt-8">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<h2 class="font-display font-semibold text-lg text-[#F9FAFB]">My Roadmaps</h2>
<div class="bg-[#111827] border border-[#1F2937] p-1 rounded-[10px] inline-flex items-center gap-1 self-start sm:self-auto" id="course-filters">
<button class="filter-tab bg-[#6366F1] text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors" data-filter="all" type="button">All</button>
<button class="filter-tab text-[#9CA3AF] hover:text-[#F9FAFB] px-3 py-1 rounded-lg text-xs font-medium transition-colors" data-filter="in-progress" type="button">In Progress</button>
<button class="filter-tab text-[#9CA3AF] hover:text-[#F9FAFB] px-3 py-1 rounded-lg text-xs font-medium transition-colors" data-filter="completed" type="button">Completed</button>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5" id="courses-grid">
<!-- Card 1 -->
<article class="course-card bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-xl p-5 transition-colors flex flex-col justify-between" data-status="in-progress">
<div>
<span class="inline-block bg-[#6366F1]/15 text-[#6366F1] px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Python</span>
<h3 class="font-display font-semibold text-base text-[#F9FAFB] mt-3 truncate">Python for Data Analysis</h3>
</div>
<div class="mt-5">
<div class="flex items-center justify-between text-xs font-medium mb-1.5">
<span class="text-[#9CA3AF]">Progress</span>
<span class="text-[#F9FAFB]">68%</span>
</div>
<div class="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
<div class="h-full bg-[#6366F1] rounded-full" style="width: 68%;"></div>
</div>
<div class="flex items-center justify-between text-xs text-[#9CA3AF] mt-4 pt-3 border-t border-[#1F2937]">
<span>17/25 lessons • 4 quizzes</span>
<a class="text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors" href="#">Resume →</a>
</div>
</div>
</article>
<!-- Card 2 -->
<article class="course-card bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-xl p-5 transition-colors flex flex-col justify-between" data-status="in-progress">
<div>
<span class="inline-block bg-[#10B981]/15 text-[#10B981] px-2.5 py-0.5 rounded-md text-[11px] font-semibold">AI</span>
<h3 class="font-display font-semibold text-base text-[#F9FAFB] mt-3 truncate">LLM Engineering &amp; RAG Systems</h3>
</div>
<div class="mt-5">
<div class="flex items-center justify-between text-xs font-medium mb-1.5">
<span class="text-[#9CA3AF]">Progress</span>
<span class="text-[#F9FAFB]">45%</span>
</div>
<div class="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
<div class="h-full bg-[#6366F1] rounded-full" style="width: 45%;"></div>
</div>
<div class="flex items-center justify-between text-xs text-[#9CA3AF] mt-4 pt-3 border-t border-[#1F2937]">
<span>9/20 lessons • 3 quizzes</span>
<a class="text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors" href="#">Resume →</a>
</div>
</div>
</article>
<!-- Card 3 -->
<article class="course-card bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-xl p-5 transition-colors flex flex-col justify-between" data-status="in-progress">
<div>
<span class="inline-block bg-amber-500/15 text-amber-400 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Finance</span>
<h3 class="font-display font-semibold text-base text-[#F9FAFB] mt-3 truncate">Quantitative Finance &amp; Trading</h3>
</div>
<div class="mt-5">
<div class="flex items-center justify-between text-xs font-medium mb-1.5">
<span class="text-[#9CA3AF]">Progress</span>
<span class="text-[#F9FAFB]">32%</span>
</div>
<div class="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
<div class="h-full bg-[#6366F1] rounded-full" style="width: 32%;"></div>
</div>
<div class="flex items-center justify-between text-xs text-[#9CA3AF] mt-4 pt-3 border-t border-[#1F2937]">
<span>8/25 lessons • 2 quizzes</span>
<a class="text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors" href="#">Resume →</a>
</div>
</div>
</article>
<!-- Card 4 -->
<article class="course-card bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-xl p-5 transition-colors flex flex-col justify-between" data-status="completed">
<div>
<span class="inline-block bg-[#6366F1]/15 text-[#6366F1] px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Python</span>
<h3 class="font-display font-semibold text-base text-[#F9FAFB] mt-3 truncate">TypeScript &amp; React Architecture</h3>
</div>
<div class="mt-5">
<div class="flex items-center justify-between text-xs font-medium mb-1.5">
<span class="text-[#9CA3AF]">Completed</span>
<span class="text-[#10B981]">100%</span>
</div>
<div class="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
<div class="h-full bg-[#10B981] rounded-full" style="width: 100%;"></div>
</div>
<div class="flex items-center justify-between text-xs text-[#9CA3AF] mt-4 pt-3 border-t border-[#1F2937]">
<span>18/18 lessons • 6 quizzes</span>
<a class="text-[#10B981] hover:text-[#34D399] font-medium transition-colors" href="#">Review →</a>
</div>
</div>
</article>
<!-- Card 5 -->
<article class="course-card bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-xl p-5 transition-colors flex flex-col justify-between" data-status="in-progress">
<div>
<span class="inline-block bg-[#10B981]/15 text-[#10B981] px-2.5 py-0.5 rounded-md text-[11px] font-semibold">AI</span>
<h3 class="font-display font-semibold text-base text-[#F9FAFB] mt-3 truncate">Deep Learning &amp; Neural Networks</h3>
</div>
<div class="mt-5">
<div class="flex items-center justify-between text-xs font-medium mb-1.5">
<span class="text-[#9CA3AF]">Progress</span>
<span class="text-[#F9FAFB]">80%</span>
</div>
<div class="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
<div class="h-full bg-[#6366F1] rounded-full" style="width: 80%;"></div>
</div>
<div class="flex items-center justify-between text-xs text-[#9CA3AF] mt-4 pt-3 border-t border-[#1F2937]">
<span>16/20 lessons • 4 quizzes</span>
<a class="text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors" href="#">Resume →</a>
</div>
</div>
</article>
<!-- Card 6 -->
<article class="course-card bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-xl p-5 transition-colors flex flex-col justify-between" data-status="in-progress">
<div>
<span class="inline-block bg-amber-500/15 text-amber-400 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Finance</span>
<h3 class="font-display font-semibold text-base text-[#F9FAFB] mt-3 truncate">Corporate Valuation &amp; Modeling</h3>
</div>
<div class="mt-5">
<div class="flex items-center justify-between text-xs font-medium mb-1.5">
<span class="text-[#9CA3AF]">Progress</span>
<span class="text-[#F9FAFB]">90%</span>
</div>
<div class="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
<div class="h-full bg-[#6366F1] rounded-full" style="width: 90%;"></div>
</div>
<div class="flex items-center justify-between text-xs text-[#9CA3AF] mt-4 pt-3 border-t border-[#1F2937]">
<span>18/20 lessons • 5 quizzes</span>
<a class="text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors" href="#">Resume →</a>
</div>
</div>
</article>
</div>
</section>
</main>
</div>
<script>
    (function () {
      const newRoadmapBtn = document.getElementById('new-roadmap-btn');
      const newRoadmapMenu = document.getElementById('new-roadmap-menu');

      if (newRoadmapBtn && newRoadmapMenu) {
        newRoadmapBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          newRoadmapMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', function () {
          if (!newRoadmapMenu.classList.contains('hidden')) {
            newRoadmapMenu.classList.add('hidden');
          }
        });
      }

      const filterButtons = document.querySelectorAll('.filter-tab');
      const courseCards = document.querySelectorAll('.course-card');

      filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const filter = btn.getAttribute('data-filter');

          filterButtons.forEach(function (b) {
            b.classList.remove('bg-[#6366F1]', 'text-white');
            b.classList.add('text-[#9CA3AF]');
          });
          btn.classList.add('bg-[#6366F1]', 'text-white');
          btn.classList.remove('text-[#9CA3AF]');

          courseCards.forEach(function (card) {
            const status = card.getAttribute('data-status');
            if (filter === 'all' || status === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    })();
  </script>
</body></html>

<!-- LearnFlow - Minimalist Course Study Workspace -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="web_dashboard" name="shell-type"/>
<title>LearnFlow</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; }
    }
    ::-webkit-scrollbar { display: none; }
  </style>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          fontFamily: {
            sans: ["Plus Jakarta Sans", "sans-serif"],
            display: ["Space Grotesk", "sans-serif"],
          }
        }
      }
    };
  </script>
</head>
<body class="bg-[#0B0F19] font-sans text-[#F9FAFB] antialiased">
<!-- Left Sidebar (Fixed 220px) -->
<aside class="fixed left-0 top-0 h-full w-[220px] bg-[#0B0F19] border-r border-[#1F2937] z-50 flex flex-col py-5">
<div class="px-5 mb-8 flex items-center gap-2.5">
<img alt="LearnFlow Icon" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_ZqfM9u0ori5oVju14WYocOCaiXZVA5inVVy24JirbP6fchJPCC9g_cVR00tMhMlVQWN-5ctsLYuHW831xj7_a69EhVNZ3yg2MPszbExeXuOp7PcQlDCKRpRM3d0sQmENCF8XNt9qw1YHCq16aT0Xx-Y3O9LtQKkDZ73lqtYKeA-ABxtVPhbqks7rP6BXFkehxD3Zh-FnD1V4IhVB_BwhCuFPH3sWGCXkzph90k"/>
<span class="font-display font-bold text-lg text-[#F9FAFB] tracking-tight">LearnFlow</span>
</div>
<nav class="flex-1 px-3 space-y-1">
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="home" href="#">
<span class="material-symbols-outlined text-[19px]">home</span>
<span>Home</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="search" href="#">
<span class="material-symbols-outlined text-[19px]">search</span>
<span>Search</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="my-roadmaps" href="#">
<span class="material-symbols-outlined text-[19px]">school</span>
<span>My Roadmaps</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="settings" href="#">
<span class="material-symbols-outlined text-[19px]">settings</span>
<span>Settings</span>
</a>
</nav>
<div class="px-3 mt-auto">
<div class="bg-[#111827] border border-[#1F2937] rounded-[10px] px-3 py-2.5 flex items-center justify-between text-xs font-medium">
<span class="text-[#F9FAFB] flex items-center gap-1.5">🔥 12d</span>
<span class="text-[#9CA3AF] flex items-center gap-1.5">🟢 Ollama</span>
</div>
</div>
</aside>
<!-- Main Content Area -->
<div class="pl-[220px] min-h-screen flex flex-col">
<!-- Top Header Bar (Height 48px) -->
<header class="fixed top-0 left-[220px] right-0 h-12 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1F2937] z-40 px-6 flex items-center justify-between">
<!-- Left: Search Trigger Pill -->
<button class="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] px-3 py-1 rounded-[10px] flex items-center gap-2 text-xs font-medium transition-colors" id="quick-search-btn" type="button">
<span class="material-symbols-outlined text-[15px]">search</span>
<span>⌘K Search...</span>
</button>
<!-- Right: Actions + Native Windows Controls -->
<div class="flex items-center gap-3">
<button aria-label="Edit" class="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] p-1.5 rounded-[10px] flex items-center justify-center transition-colors" title="Edit" type="button">
<span class="material-symbols-outlined text-[16px]">edit</span>
</button>
<div class="relative">
<button class="bg-[#6366F1] hover:bg-[#5558E6] text-white px-3 py-1.5 rounded-[10px] text-xs font-semibold flex items-center gap-1 transition-colors" id="new-roadmap-btn" type="button">
<span>+ New Roadmap</span>
<span class="material-symbols-outlined text-[15px]">expand_more</span>
</button>
<div class="hidden absolute right-0 mt-1.5 w-44 bg-[#111827] border border-[#1F2937] rounded-[10px] shadow-xl py-1 z-50" id="new-roadmap-menu">
<button class="w-full text-left px-3 py-2 text-xs font-medium text-[#F9FAFB] hover:bg-[#1F2937] flex items-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-[#6366F1]">edit_note</span>
<span>Manual</span>
</button>
<button class="w-full text-left px-3 py-2 text-xs font-medium text-[#F9FAFB] hover:bg-[#1F2937] flex items-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-[#10B981]">auto_awesome</span>
<span>AI Generate</span>
</button>
</div>
</div>
<!-- Native Windows Title Bar Controls -->
<div class="flex items-center ml-2 pl-3 border-l border-[#1F2937] text-[#9CA3AF]">
<button aria-label="Minimize" class="w-8 h-7 flex items-center justify-center hover:bg-[#1F2937] hover:text-[#F9FAFB] rounded text-xs transition-colors" type="button">—</button>
<button aria-label="Maximize" class="w-8 h-7 flex items-center justify-center hover:bg-[#1F2937] hover:text-[#F9FAFB] rounded text-xs transition-colors" type="button">□</button>
<button aria-label="Close" class="w-8 h-7 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 rounded text-xs transition-colors" type="button">✕</button>
</div>
</div>
</header>
<!-- Main Workspace -->
<main class="pt-12 flex-1 px-8 py-7 max-w-[1220px] w-full mx-auto"><div class="flex flex-col w-full">
<!-- Sub-Header / Breadcrumb context -->
<div class="flex items-center justify-between pb-4">
<div class="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span class="hover:text-on-surface cursor-pointer transition-colors">Home</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="hover:text-on-surface cursor-pointer transition-colors">Data Science Track</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="text-primary font-medium">Python for Data Analysis</span>
</div>
<div class="flex items-center gap-2">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-secondary text-label-sm font-label-sm">
<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
        In Progress
      </span>
<span class="text-outline text-label-sm font-label-sm">v2.4 LTS</span>
</div>
</div>
<!-- Course Title & Overview Hero Strip -->
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
<div class="flex items-center gap-3">
<div class="p-2.5 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[26px]">terminal</span>
</div>
<div>
<div class="flex items-center gap-2.5">
<h1 class="text-headline-md font-headline-md text-on-surface tracking-tight">Python for Data Analysis &amp; Automation</h1>
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Python / Data</span>
<button class="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Rename or Edit Course Title">
<span class="material-symbols-outlined text-[16px]">edit</span>
</button>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Automate data manipulation, exploratory pipelines, and tabular analytics.</p>
</div>
</div>
<div class="flex items-center gap-3">
<button class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">notes</span>
        Notes (14)
      </button>
<button class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">share</span>
        Share
      </button>
</div>
</div>
<!-- Streamlined Progress Banner Card -->
<div class="rounded-xl bg-surface-container p-5 mb-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
<div class="absolute -right-16 -top-16 w-52 h-52 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
<div class="flex-1 flex flex-col justify-center space-y-3">
<div class="flex items-center justify-between max-w-xl">
<div class="flex items-center gap-2">
<span class="text-title-lg font-title-lg text-on-surface">Overall Course Progress</span>
<span class="text-label-md font-label-md font-bold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary">68%</span>
</div>
<span class="text-body-sm font-body-sm text-on-surface-variant font-medium">17/25 Lessons Completed</span>
</div>
<!-- Custom dual-toned progress bar -->
<div class="w-full max-w-xl h-2.5 bg-surface-container-lowest rounded-full overflow-hidden flex">
<div class="h-full bg-secondary transition-all duration-500" style="width: 52%;" title="Completed"></div>
<div class="h-full bg-primary-container transition-all duration-500" style="width: 16%;" title="Current Module"></div>
</div>
<!-- Quick Metrics Strip -->
<div class="flex flex-wrap items-center gap-4 text-label-md font-label-md text-outline">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span class="text-on-surface">17</span> / 25 Lessons
        </div>
<span class="text-surface-container-highest">•</span>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary">quiz</span>
<span class="text-on-surface">5</span> / 8 Quizzes Passed
        </div>
<span class="text-surface-container-highest">•</span>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span>~4h left</span>
</div>
<span class="text-surface-container-highest">•</span>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-tertiary">bolt</span>
<span>Avg score 94%</span>
</div>
</div>
</div>
<!-- Resume Callout -->
<div class="flex items-center lg:pl-6 lg:border-l lg:border-surface-container-highest shrink-0">
<button class="w-full sm:w-auto px-5 py-3 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-label-lg font-label-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/25 hover:shadow-primary-container/40 transition-all active:scale-[0.98]">
<span>Continue: Lesson 2.2</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
<!-- Curriculum Header -->
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-2">
<h2 class="text-title-lg font-title-lg text-on-surface">Curriculum Modules</h2>
<span class="px-2 py-0.5 rounded-full bg-surface-container-high text-outline text-label-sm font-label-sm">3 Modules Total</span>
</div>
<div class="flex items-center gap-2">
<button class="text-label-md font-label-md text-outline hover:text-on-surface transition-colors flex items-center gap-1" id="toggle-all-btn">
<span class="material-symbols-outlined text-[16px]">unfold_more</span>
        Toggle All
      </button>
</div>
</div>
<!-- Modules Stack -->
<div class="space-y-4">
<!-- MODULE 1: Completed -->
<div class="rounded-xl bg-surface-container transition-colors duration-200">
<div class="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-surface-container-high/60 transition-colors rounded-xl" id="module-1-header">
<div class="flex items-center gap-3.5">
<div class="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<div>
<div class="flex items-center gap-2.5">
<span class="text-title-md font-title-md text-on-surface">Module 1: Python Fundamentals</span>
<span class="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-label-sm font-label-sm font-semibold">Completed (8/8)</span>
</div>
<p class="text-body-sm font-body-sm text-outline">Variables, data structures, loops, functions, and standard library core</p>
</div>
</div>
<div class="flex items-center gap-3">
<span class="text-label-sm font-label-sm px-2 py-1 rounded bg-surface-container-lowest text-secondary font-medium">Quiz: 10/10 Score</span>
<span class="text-outline hover:text-on-surface transition-transform duration-200" id="module-1-chevron">
<span class="material-symbols-outlined text-[20px]">expand_more</span>
</span>
</div>
</div>
<!-- Collapsed Content Container -->
<div class="hidden px-4 pb-4 pt-1 border-t border-surface-container-highest space-y-2" id="module-1-body">
<div class="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-container-low text-body-sm font-body-sm text-on-surface-variant">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[16px]">check</span>
            Lesson 1.1: Syntax &amp; Environment Setup
          </span>
<span class="text-label-sm font-label-sm text-outline">12m</span>
</div>
<div class="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-container-low text-body-sm font-body-sm text-on-surface-variant">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[16px]">check</span>
            Lesson 1.2: Lists, Dicts &amp; Tuples Deep-Dive
          </span>
<span class="text-label-sm font-label-sm text-outline">25m</span>
</div>
<div class="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-container-low text-body-sm font-body-sm text-on-surface-variant">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[16px]">check</span>
            Lesson 1.3: List Comprehensions &amp; Generators
          </span>
<span class="text-label-sm font-label-sm text-outline">18m</span>
</div>
</div>
</div>
<!-- MODULE 2: In Progress & Active -->
<div class="rounded-xl bg-surface-container shadow-md overflow-hidden ring-1 ring-primary/20">
<!-- Header -->
<div class="p-4 bg-surface-container-high/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div class="flex items-center gap-3.5">
<div class="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]">dataset</span>
</div>
<div>
<div class="flex items-center gap-2.5">
<span class="text-title-md font-title-md text-on-surface">Module 2: Working with Pandas &amp; NumPy</span>
<span class="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-label-sm font-label-sm font-semibold">In Progress</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant">Vectorized arithmetic, ndarray manipulation, indexing, cleaning, and aggregation</p>
</div>
</div>
<!-- Right side module metric -->
<div class="flex items-center gap-3 pl-11 sm:pl-0">
<div class="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
<span>60% Complete</span>
<div class="w-20 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-primary-container rounded-full" style="width: 60%;"></div>
</div>
</div>
<span class="material-symbols-outlined text-[20px] text-outline">expand_less</span>
</div>
</div>
<!-- Lesson Items -->
<div class="p-4 space-y-2">
<!-- Row 1: Completed Lesson -->
<div class="group flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="text-body-md font-body-md text-on-surface">Lesson 2.1: NumPy Arrays &amp; Vectorization</span>
</div>
<div class="flex items-center gap-3">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-outline text-label-sm font-label-sm">15m duration</span>
<button class="text-label-sm font-label-sm text-outline hover:text-on-surface transition-colors">Review</button>
</div>
</div>
<!-- Row 2: ACTIVE HIGHLIGHT LESSON -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-primary-container/10 ring-1 ring-primary-container gap-3 shadow-inner">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[14px]">play_arrow</span>
</div>
<div>
<span class="text-body-md font-body-md text-on-surface font-semibold">Lesson 2.2: DataFrame Indexing &amp; Multi-Indexing</span>
<span class="hidden sm:inline-block ml-2 text-label-sm font-label-sm text-primary font-medium">• Current Active Step</span>
</div>
</div>
<div class="flex items-center gap-3 self-end sm:self-auto">
<span class="px-2 py-0.5 rounded bg-primary-container/20 text-primary text-label-sm font-label-sm font-medium">20m duration</span>
<button class="px-3.5 py-1.5 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-label-sm font-label-sm font-semibold flex items-center gap-1 shadow-md shadow-primary-container/20 transition-all">
<span>Read Now</span>
<span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
<!-- Row 3: Locked Lesson -->
<div class="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50 opacity-60">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-outline text-[20px]">lock</span>
<span class="text-body-md font-body-md text-on-surface-variant">Lesson 2.3: Handling Missing Values &amp; Imputation</span>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-lowest text-outline text-label-sm font-label-sm">18m duration</span>
</div>
<!-- Row 4: Locked Lesson -->
<div class="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/50 opacity-60">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-outline text-[20px]">lock</span>
<span class="text-body-md font-body-md text-on-surface-variant">Lesson 2.4: GroupBy, Pivot Tables &amp; Aggregations</span>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container-lowest text-outline text-label-sm font-label-sm">22m duration</span>
</div>
<!-- Module 2 Practice Exercises Block -->
<div class="mt-4 pt-4 border-t border-surface-container-highest">
<div class="flex items-center justify-between mb-3">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary text-[18px]">track_changes</span>
<span class="text-title-md font-title-md text-on-surface">Module 2 Practice (3 tasks)</span>
</div>
<span class="text-label-sm font-label-sm text-outline">Hands-on checkpoints required for module certification</span>
</div>
<!-- 3 Practice Action Cards Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
<!-- Task 1: Quiz -->
<div class="p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high/80 transition-all flex flex-col justify-between space-y-3">
<div>
<div class="flex items-center justify-between mb-1.5">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary text-label-sm font-label-sm font-medium">Knowledge Check</span>
<span class="text-label-sm font-label-sm text-outline">5 mins</span>
</div>
<h3 class="text-body-md font-body-md text-on-surface font-semibold">Quiz: DataFrame Slicing</h3>
<p class="text-body-sm font-body-sm text-outline mt-0.5">5 conceptual questions on loc/iloc indexing edge cases.</p>
</div>
<button class="w-full py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface text-label-md font-label-md font-medium flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">quiz</span>
                Start Quiz
              </button>
</div>
<!-- Task 2: Flashcards -->
<div class="p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high/80 transition-all flex flex-col justify-between space-y-3">
<div>
<div class="flex items-center justify-between mb-1.5">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary text-label-sm font-label-sm font-medium">Spaced Recall</span>
<span class="text-label-sm font-label-sm text-outline">3 mins</span>
</div>
<h3 class="text-body-md font-body-md text-on-surface font-semibold">Flashcards: 10 Core Methods</h3>
<p class="text-body-sm font-body-sm text-outline mt-0.5">Rapid recall on axis parameters, merges vs joins, and fills.</p>
</div>
<button class="w-full py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md font-label-md font-medium flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">style</span>
                Review
              </button>
</div>
<!-- Task 3: Coding Sandbox -->
<div class="p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high/80 transition-all flex flex-col justify-between space-y-3">
<div>
<div class="flex items-center justify-between mb-1.5">
<span class="px-2 py-0.5 rounded bg-surface-container-highest text-tertiary text-label-sm font-label-sm font-medium">Jupyter Lab</span>
<span class="text-label-sm font-label-sm text-outline">15 mins</span>
</div>
<h3 class="text-body-md font-body-md text-on-surface font-semibold">Coding Sandbox: Real Dataset</h3>
<p class="text-body-sm font-body-sm text-outline mt-0.5">Clean and restructure 50k rows of simulated e-commerce telemetry.</p>
</div>
<button class="w-full py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-on-surface text-label-md font-label-md font-medium flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[16px]">code</span>
                Launch Sandbox
              </button>
</div>
</div>
</div>
</div>
</div>
<!-- MODULE 3: Locked -->
<div class="rounded-xl bg-surface-container/60 p-4 opacity-50 select-none">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3.5">
<div class="w-8 h-8 rounded-lg bg-surface-container-low text-outline flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]">lock</span>
</div>
<div>
<div class="flex items-center gap-2.5">
<span class="text-title-md font-title-md text-outline">Module 3: Data Visualization &amp; Dashboarding</span>
<span class="px-2 py-0.5 rounded bg-surface-container-lowest text-outline text-label-sm font-label-sm">Locked</span>
</div>
<p class="text-body-sm font-body-sm text-outline/80">Matplotlib canvas, Seaborn statistical plots, interactive Plotly graphics (6 lessons)</p>
</div>
</div>
<div class="flex items-center gap-2 text-label-sm font-label-sm text-outline">
<span class="material-symbols-outlined text-[16px]">lock_clock</span>
<span>Requires Module 2</span>
</div>
</div>
</div>
</div>
<!-- Bottom Workspace Footnote -->
<div class="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-label-sm font-label-sm text-outline">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
<span>Progress auto-saved locally and synchronized with local Ollama runtime</span>
</div>
<div class="flex items-center gap-4">
<a class="hover:text-on-surface transition-colors" href="#">Keyboard Shortcuts (⌘/)</a>
<span>•</span>
<a class="hover:text-on-surface transition-colors" href="#">Export Syllabus (.json)</a>
</div>
</div>
</div>
<script>
  (function() {
    const mod1Header = document.getElementById('module-1-header');
    const mod1Body = document.getElementById('module-1-body');
    const mod1Chevron = document.getElementById('module-1-chevron');
    const toggleAllBtn = document.getElementById('toggle-all-btn');

    if (mod1Header && mod1Body && mod1Chevron) {
      mod1Header.addEventListener('click', function() {
        const isHidden = mod1Body.classList.contains('hidden');
        if (isHidden) {
          mod1Body.classList.remove('hidden');
          mod1Chevron.style.transform = 'rotate(180deg)';
        } else {
          mod1Body.classList.add('hidden');
          mod1Chevron.style.transform = 'rotate(0deg)';
        }
      });
    }

    if (toggleAllBtn && mod1Body && mod1Chevron) {
      toggleAllBtn.addEventListener('click', function() {
        const isHidden = mod1Body.classList.contains('hidden');
        if (isHidden) {
          mod1Body.classList.remove('hidden');
          mod1Chevron.style.transform = 'rotate(180deg)';
        } else {
          mod1Body.classList.add('hidden');
          mod1Chevron.style.transform = 'rotate(0deg)';
        }
      });
    }
  })();
</script></main>
</div>
<script>
    (function () {
      const newRoadmapBtn = document.getElementById('new-roadmap-btn');
      const newRoadmapMenu = document.getElementById('new-roadmap-menu');

      if (newRoadmapBtn && newRoadmapMenu) {
        newRoadmapBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          newRoadmapMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', function () {
          if (!newRoadmapMenu.classList.contains('hidden')) {
            newRoadmapMenu.classList.add('hidden');
          }
        });
      }

      const filterButtons = document.querySelectorAll('.filter-tab');
      const courseCards = document.querySelectorAll('.course-card');

      filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const filter = btn.getAttribute('data-filter');

          filterButtons.forEach(function (b) {
            b.classList.remove('bg-[#6366F1]', 'text-white');
            b.classList.add('text-[#9CA3AF]');
          });
          btn.classList.add('bg-[#6366F1]', 'text-white');
          btn.classList.remove('text-[#9CA3AF]');

          courseCards.forEach(function (card) {
            const status = card.getAttribute('data-status');
            if (filter === 'all' || status === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    })();
  </script>
</body></html>

<!-- LearnFlow - Deep Focus Lesson Reader & Practice Quiz -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="web_dashboard" name="shell-type"/>
<title>LearnFlow</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; }
    }
    ::-webkit-scrollbar { display: none; }
  </style>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          fontFamily: {
            sans: ["Plus Jakarta Sans", "sans-serif"],
            display: ["Space Grotesk", "sans-serif"],
          }
        }
      }
    };
  </script>
</head>
<body class="bg-[#0B0F19] font-sans text-[#F9FAFB] antialiased">
<!-- Left Sidebar (Fixed 220px) -->
<aside class="fixed left-0 top-0 h-full w-[220px] bg-[#0B0F19] border-r border-[#1F2937] z-50 flex flex-col py-5">
<div class="px-5 mb-8 flex items-center gap-2.5">
<img alt="LearnFlow Icon" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_ZqfM9u0ori5oVju14WYocOCaiXZVA5inVVy24JirbP6fchJPCC9g_cVR00tMhMlVQWN-5ctsLYuHW831xj7_a69EhVNZ3yg2MPszbExeXuOp7PcQlDCKRpRM3d0sQmENCF8XNt9qw1YHCq16aT0Xx-Y3O9LtQKkDZ73lqtYKeA-ABxtVPhbqks7rP6BXFkehxD3Zh-FnD1V4IhVB_BwhCuFPH3sWGCXkzph90k"/>
<span class="font-display font-bold text-lg text-[#F9FAFB] tracking-tight">LearnFlow</span>
</div>
<nav class="flex-1 px-3 space-y-1">
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="home" href="#">
<span class="material-symbols-outlined text-[19px]">home</span>
<span>Home</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="search" href="#">
<span class="material-symbols-outlined text-[19px]">search</span>
<span>Search</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="my-roadmaps" href="#">
<span class="material-symbols-outlined text-[19px]">school</span>
<span>My Roadmaps</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#9CA3AF] hover:bg-[#111827] hover:text-[#F9FAFB] font-medium text-sm transition-colors" data-path="settings" href="#">
<span class="material-symbols-outlined text-[19px]">settings</span>
<span>Settings</span>
</a>
</nav>
<div class="px-3 mt-auto">
<div class="bg-[#111827] border border-[#1F2937] rounded-[10px] px-3 py-2.5 flex items-center justify-between text-xs font-medium">
<span class="text-[#F9FAFB] flex items-center gap-1.5">🔥 12d</span>
<span class="text-[#9CA3AF] flex items-center gap-1.5">🟢 Ollama</span>
</div>
</div>
</aside>
<!-- Main Content Area -->
<div class="pl-[220px] min-h-screen flex flex-col">
<!-- Top Header Bar (Height 48px) -->
<header class="fixed top-0 left-[220px] right-0 h-12 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1F2937] z-40 px-6 flex items-center justify-between">
<!-- Left: Search Trigger Pill -->
<button class="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] px-3 py-1 rounded-[10px] flex items-center gap-2 text-xs font-medium transition-colors" id="quick-search-btn" type="button">
<span class="material-symbols-outlined text-[15px]">search</span>
<span>⌘K Search...</span>
</button>
<!-- Right: Actions + Native Windows Controls -->
<div class="flex items-center gap-3">
<button aria-label="Edit" class="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] p-1.5 rounded-[10px] flex items-center justify-center transition-colors" title="Edit" type="button">
<span class="material-symbols-outlined text-[16px]">edit</span>
</button>
<div class="relative">
<button class="bg-[#6366F1] hover:bg-[#5558E6] text-white px-3 py-1.5 rounded-[10px] text-xs font-semibold flex items-center gap-1 transition-colors" id="new-roadmap-btn" type="button">
<span>+ New Roadmap</span>
<span class="material-symbols-outlined text-[15px]">expand_more</span>
</button>
<div class="hidden absolute right-0 mt-1.5 w-44 bg-[#111827] border border-[#1F2937] rounded-[10px] shadow-xl py-1 z-50" id="new-roadmap-menu">
<button class="w-full text-left px-3 py-2 text-xs font-medium text-[#F9FAFB] hover:bg-[#1F2937] flex items-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-[#6366F1]">edit_note</span>
<span>Manual</span>
</button>
<button class="w-full text-left px-3 py-2 text-xs font-medium text-[#F9FAFB] hover:bg-[#1F2937] flex items-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-[#10B981]">auto_awesome</span>
<span>AI Generate</span>
</button>
</div>
</div>
<!-- Native Windows Title Bar Controls -->
<div class="flex items-center ml-2 pl-3 border-l border-[#1F2937] text-[#9CA3AF]">
<button aria-label="Minimize" class="w-8 h-7 flex items-center justify-center hover:bg-[#1F2937] hover:text-[#F9FAFB] rounded text-xs transition-colors" type="button">—</button>
<button aria-label="Maximize" class="w-8 h-7 flex items-center justify-center hover:bg-[#1F2937] hover:text-[#F9FAFB] rounded text-xs transition-colors" type="button">□</button>
<button aria-label="Close" class="w-8 h-7 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 rounded text-xs transition-colors" type="button">✕</button>
</div>
</div>
</header>
<!-- Main Workspace -->
<main class="pt-12 flex-1 px-8 py-7 max-w-[1220px] w-full mx-auto"><div class="flex flex-col w-full relative -mt-7 -mx-8 min-h-[calc(100vh-48px)] overflow-hidden select-none">
<!-- Underlying Dimmed & Blurred Course Workspace (Simulated Desktop Canvas) -->
<div aria-hidden="true" class="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-40 blur-[3px] bg-surface-container-lowest">
<!-- Left Workspace Column (visible behind backdrop 20%) -->
<div class="col-span-3 p-6 flex flex-col gap-6">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-title-md text-title-md">PY</span>
<div>
<h2 class="font-title-md text-title-md text-on-surface">Data Science Sprint</h2>
<p class="font-label-sm text-label-sm text-outline">Pandas Core Foundations</p>
</div>
</div>
<span class="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded-full">68%</span>
</div>
<!-- Roadmap Progress Bar -->
<div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full w-[68%]"></div>
</div>
<!-- Module Outline Mock -->
<div class="space-y-3 pt-2">
<div class="p-3 bg-surface-container rounded-xl flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface">1. Data Ingestion &amp; I/O</span>
<span class="material-symbols-outlined text-secondary text-[18px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<div class="p-3 bg-surface-container-high rounded-xl flex items-center justify-between ring-1 ring-primary/40">
<span class="font-label-md text-label-md text-primary font-semibold">2. DataFrame Indexing</span>
<span class="font-label-sm text-label-sm text-primary">In Progress</span>
</div>
<div class="p-3 bg-surface-container rounded-xl flex items-center justify-between opacity-60">
<span class="font-label-md text-label-md text-on-surface">3. Aggregation &amp; GroupBy</span>
<span class="material-symbols-outlined text-outline text-[18px]">lock</span>
</div>
<div class="p-3 bg-surface-container rounded-xl flex items-center justify-between opacity-60">
<span class="font-label-md text-label-md text-on-surface">4. Time-Series Slicing</span>
<span class="material-symbols-outlined text-outline text-[18px]">lock</span>
</div>
</div>
<!-- Visual Metric Sparkline Card -->
<div class="p-4 bg-surface-container rounded-xl flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">Weekly Focus</span>
<span class="font-label-sm text-label-sm text-secondary">+14% vs avg</span>
</div>
<svg class="w-full h-12 text-primary" fill="none" stroke="currentColor" viewbox="0 0 200 48">
<path d="M 0 35 Q 25 10 50 28 T 100 12 T 150 30 T 200 8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
<path d="M 0 35 Q 25 10 50 28 T 100 12 T 150 30 T 200 8 L 200 48 L 0 48 Z" fill="currentColor" fill-opacity="0.08"></path>
</svg>
</div>
</div>
</div>
<!-- Slide-Over Scrim (Left 20% clickable to close) -->
<div class="absolute inset-0 flex select-text">
<div class="w-1/5 h-full cursor-pointer bg-surface-container-lowest/80 backdrop-blur-md transition-opacity hover:opacity-90 flex items-start justify-center pt-8" id="scrim-close-area">
<div class="px-3 py-1.5 rounded-full bg-surface-container-high/90 text-on-surface-variant flex items-center gap-1.5 shadow-lg shadow-black/40">
<span class="material-symbols-outlined text-[16px]">west</span>
<span class="font-label-sm text-label-sm">Click backdrop or press Esc</span>
</div>
</div>
<!-- 80% Slide-Over Deep Focus Reader Drawer -->
<section class="w-4/5 h-full bg-surface flex flex-col shadow-2xl shadow-black relative overflow-hidden" style="max-height: calc(100vh - 48px);">
<!-- Minimalist Top Bar (Height 44px, sticky header inside reader) -->
<header class="h-11 min-h-[44px] bg-surface-container-low px-6 flex items-center justify-between z-20 shadow-sm">
<!-- Left: Breadcrumb & Meta -->
<div class="flex items-center gap-2.5 min-w-0">
<div class="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant truncate">
<span>Module 2</span>
<span class="text-outline text-xs">/</span>
<span class="text-on-surface font-semibold truncate">Lesson 2.2: DataFrame Indexing</span>
</div>
<span class="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm flex items-center gap-1 shrink-0">
<span class="material-symbols-outlined text-[13px]">schedule</span>
            15m read
          </span>
</div>
<!-- Right Controls -->
<div class="flex items-center gap-2 shrink-0">
<!-- Text Sizing Control -->
<div class="relative">
<button class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" id="font-size-toggle" title="Adjust text scale" type="button">
<span class="font-title-md text-title-md font-bold leading-none">Aa</span>
<span class="material-symbols-outlined text-[15px] text-outline">expand_more</span>
</button>
<div class="hidden absolute right-0 mt-1 w-32 bg-surface-container-high rounded-lg p-1.5 shadow-xl z-30" id="font-size-menu">
<button class="w-full text-left px-2 py-1 rounded hover:bg-surface-container text-on-surface font-label-sm text-label-sm" type="button">Standard (100%)</button>
<button class="w-full text-left px-2 py-1 rounded hover:bg-surface-container text-on-surface font-label-sm text-label-sm" type="button">Comfortable (115%)</button>
<button class="w-full text-left px-2 py-1 rounded hover:bg-surface-container text-on-surface font-label-sm text-label-sm" type="button">Compact (90%)</button>
</div>
</div>
<!-- Fullscreen Expand -->
<button class="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center" id="fullscreen-reader-btn" title="Toggle Fullscreen Canvas" type="button">
<span class="material-symbols-outlined text-[18px]">fullscreen</span>
</button>
<!-- Close Action -->
<button class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors" id="close-reader-btn" type="button">
<span class="font-label-sm text-label-sm text-outline bg-surface-container px-1 rounded">Esc</span>
<span>Close</span>
</button>
</div>
</header>
<!-- Scrollable Lesson & Quiz Content Area -->
<div class="flex-1 overflow-y-auto px-8 py-10" id="reader-scroll-canvas" style="scroll-behavior: smooth;">
<!-- Centered Reading Container (860px max width) -->
<article class="max-w-[860px] mx-auto flex flex-col gap-10">
<!-- Lesson Title & Introduction Header -->
<div class="space-y-4">
<div class="flex items-center gap-2">
<span class="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm uppercase tracking-wider">Foundation Series</span>
<span class="text-outline text-xs">•</span>
<span class="font-label-sm text-label-sm text-outline">Pandas 2.2 Core</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Mastering DataFrame Indexing with .loc and .iloc</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Pandas provides two primary methods for slicing and accessing subset data: label-oriented extraction using <code class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-mono text-xs">df.loc[]</code> and zero-indexed integer positioning with <code class="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-mono text-xs">df.iloc[]</code>. Discerning the precise behavioral contract between boundaries, booleans, and indices is fundamental to high-throughput data processing.
            </p>
</div>
<!-- Side-by-Side Comparison Architecture -->
<section class="grid grid-cols-2 gap-5">
<!-- loc card -->
<div class="p-6 rounded-xl bg-surface-container-low flex flex-col gap-3.5 relative overflow-hidden group hover:bg-surface-container transition-colors">
<div class="absolute top-0 left-0 h-1 w-full bg-primary-container"></div>
<div class="flex items-center justify-between">
<span class="font-title-lg text-title-lg text-primary font-mono font-bold">.loc[]</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container/20 text-on-primary-container">Label-Based</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                References explicit index identifiers and column names. Unlike typical Python ranges, both boundary endpoints are fully inclusive.
              </p>
<ul class="space-y-2 pt-2 text-on-surface-variant font-body-sm text-body-sm">
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">check</span>
<span><strong>Endpoint Inclusive:</strong> Slice <code class="text-primary font-mono text-xs">'2023':'2024'</code> retains both bounding years.</span>
</li>
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">check</span>
<span><strong>Boolean Mask Friendly:</strong> Accepts logical filters aligned directly to index values.</span>
</li>
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">check</span>
<span>Explicit KeyError raised when labels fail resolution.</span>
</li>
</ul>
</div>
<!-- iloc card -->
<div class="p-6 rounded-xl bg-surface-container-low flex flex-col gap-3.5 relative overflow-hidden group hover:bg-surface-container transition-colors">
<div class="absolute top-0 left-0 h-1 w-full bg-secondary-container"></div>
<div class="flex items-center justify-between">
<span class="font-title-lg text-title-lg text-secondary font-mono font-bold">.iloc[]</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary">Integer-Based</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Adheres strictly to Python memory offsets starting at <code class="text-secondary font-mono text-xs">0</code>. Slicing adopts standard half-open intervals <code class="text-secondary font-mono text-xs">[start:stop)</code>.
              </p>
<ul class="space-y-2 pt-2 text-on-surface-variant font-body-sm text-body-sm">
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">check</span>
<span><strong>Stop Exclusive:</strong> Interval <code class="text-secondary font-mono text-xs">0:5</code> returns positions 0, 1, 2, 3, and 4.</span>
</li>
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">check</span>
<span><strong>Ordinal Lookups:</strong> Agnostic to custom string labels or semantic index names.</span>
</li>
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">check</span>
<span>Raises IndexError for out-of-bounds positional targets.</span>
</li>
</ul>
</div>
</section>
<!-- Technical Code Block Component (IDE Card) -->
<div class="rounded-xl overflow-hidden bg-surface-container-lowest shadow-xl">
<!-- IDE Window Header -->
<div class="bg-surface-container-low px-4 py-2.5 flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="flex items-center gap-1.5">
<div class="w-3 h-3 rounded-full bg-error-container/70"></div>
<div class="w-3 h-3 rounded-full bg-tertiary-container/70"></div>
<div class="w-3 h-3 rounded-full bg-secondary-container/70"></div>
</div>
<div class="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-primary">data_object</span>
<span>example_indexing.py</span>
</div>
</div>
<div class="flex items-center gap-3">
<span class="font-label-sm text-label-sm text-outline">Python 3.11</span>
<button class="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" id="copy-code-btn" type="button">
<span class="material-symbols-outlined text-[14px]">content_copy</span>
<span id="copy-label">Copy Code</span>
</button>
</div>
</div>
<!-- Editor Body with Precise Syntax Styling -->
<pre class="p-5 font-mono text-xs leading-6 overflow-x-auto text-on-surface select-text bg-[#0B0F19]"><code class="language-python"><span class="text-outline"># 1. Instantiate sample analytical DataFrame</span>
<span class="text-primary">import</span> pandas <span class="text-primary">as</span> pd

data = {
    <span class="text-secondary">'Country'</span>: [<span class="text-secondary">'DE'</span>, <span class="text-secondary">'US'</span>, <span class="text-secondary">'JP'</span>, <span class="text-secondary">'FR'</span>],
    <span class="text-secondary">'Users'</span>: [<span class="text-tertiary">4200</span>, <span class="text-tertiary">18900</span>, <span class="text-tertiary">7100</span>, <span class="text-tertiary">3500</span>],
    <span class="text-secondary">'Retention'</span>: [<span class="text-tertiary">0.82</span>, <span class="text-tertiary">0.74</span>, <span class="text-tertiary">0.91</span>, <span class="text-tertiary">0.68</span>]
}
df = pd.DataFrame(data).set_index(<span class="text-secondary">'Country'</span>)

<span class="text-outline"># 2. Boolean conditioning via .loc[] with column projection</span>
high_performers = df.loc[df[<span class="text-secondary">'Retention'</span>] &gt; <span class="text-tertiary">0.80</span>, [<span class="text-secondary">'Users'</span>, <span class="text-secondary">'Retention'</span>]]

<span class="text-outline"># 3. Positional matrix slicing via .iloc[]: first 2 rows, columns 0 through 1</span>
matrix_slice = df.iloc[<span class="text-tertiary">0</span>:<span class="text-tertiary">2</span>, <span class="text-tertiary">0</span>:<span class="text-tertiary">2</span>]</code></pre>
</div>
<!-- Key Takeaways Callout Box -->
<div class="p-5 rounded-xl bg-surface-container-low flex items-start gap-4 shadow-sm">
<div class="p-2.5 rounded-lg bg-primary-container text-on-primary-container shrink-0 mt-0.5">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
</div>
<div class="space-y-2">
<h3 class="font-title-md text-title-md text-on-surface">Critical Performance &amp; Architecture Rules</h3>
<ul class="space-y-1.5 text-on-surface-variant font-body-sm text-body-sm list-disc list-inside">
<li><strong class="text-on-surface">Avoid Chained Assignment:</strong> Never invoke <code class="px-1.5 py-0.5 rounded bg-surface-container text-error font-mono text-xs">df[col][row] = val</code>. It frequently triggers Pandas' <code class="font-mono text-xs">SettingWithCopyWarning</code> and unpredictable view/copy mutations.</li>
<li><strong class="text-on-surface">Predictable Slicing:</strong> Rely on <code class="font-mono text-xs text-primary">.loc</code> whenever referencing semantic series keys (e.g. timestamps or IDs) to prevent silent index-off-by-one errors.</li>
<li><strong class="text-on-surface">Matrix Slices:</strong> Leverage <code class="font-mono text-xs text-secondary">.iloc</code> inside fast mathematical iterations or vectorized window loops where integer offsets dominate.</li>
</ul>
</div>
</div>
<!-- Expandable Student Markdown Notebook Component -->
<div class="rounded-xl bg-surface-container-low overflow-hidden">
<div class="p-4 bg-surface-container flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[19px]">edit_note</span>
<span class="font-title-md text-title-md text-on-surface">Student Notes (Markdown)</span>
<span class="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Auto-saved
                </span>
</div>
<button class="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1" id="notes-edit-btn" type="button">
<span class="material-symbols-outlined text-[15px]">mode_edit</span>
<span>Edit Notes</span>
</button>
</div>
<div class="p-5 font-body-md text-body-md text-on-surface-variant space-y-2.5">
<p>• Reminder for mock test: Slicing with string labels like <code class="px-1 py-0.5 bg-surface-container text-primary rounded font-mono text-xs">.loc['a':'c']</code> keeps both endpoints. Do not subtract 1!</p>
<p>• Boolean logic with Pandas syntax requires bitwise operators: use <code class="px-1 py-0.5 bg-surface-container text-secondary rounded font-mono text-xs">&amp;</code> and <code class="px-1 py-0.5 bg-surface-container text-secondary rounded font-mono text-xs">|</code> rather than standard Python <code class="text-outline font-mono text-xs">and</code> / <code class="text-outline font-mono text-xs">or</code>.</p>
<p class="text-outline font-label-sm text-label-sm pt-1">Last synced locally 4 minutes ago via Ollama Client Cache.</p>
</div>
</div>
<!-- INTEGRATED PRACTICE QUIZ -->
<section class="rounded-xl bg-surface-container-low p-7 flex flex-col gap-6 shadow-md" id="practice-quiz-section">
<!-- Quiz Step Progress Header -->
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">quiz</span>
<span class="font-title-md text-title-md text-on-surface">Knowledge Check</span>
<span class="text-outline text-sm">•</span>
<span class="font-label-md text-label-md text-outline">Question 2 of 5</span>
</div>
<!-- Step Progress Indicators -->
<div class="flex items-center gap-1.5">
<span class="w-6 h-1.5 rounded-full bg-secondary" title="Question 1: Completed"></span>
<span class="w-6 h-1.5 rounded-full bg-primary-container" title="Question 2: Active"></span>
<span class="w-6 h-1.5 rounded-full bg-surface-container-highest" title="Question 3"></span>
<span class="w-6 h-1.5 rounded-full bg-surface-container-highest" title="Question 4"></span>
<span class="w-6 h-1.5 rounded-full bg-surface-container-highest" title="Question 5"></span>
</div>
</div>
<!-- Question Prompt -->
<div>
<p class="font-headline-sm text-headline-sm text-on-surface leading-snug">
                Which method is best for filtering rows by a boolean condition using column names?
              </p>
</div>
<!-- 4 Choice Option Cards -->
<div class="grid grid-cols-1 gap-3" id="quiz-options-group">
<!-- Option A (Verified Correct State) -->
<div class="p-4 rounded-xl bg-surface-container flex items-center justify-between cursor-pointer ring-2 ring-secondary text-on-surface transition-all" data-choice="A">
<div class="flex items-center gap-3.5">
<span class="w-7 h-7 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-title-md text-title-md font-bold">A</span>
<div class="flex items-center gap-2">
<span class="font-mono text-sm font-bold text-secondary">.loc[]</span>
<span class="font-body-sm text-body-sm text-on-surface">— Label-based indexer supporting boolean series</span>
</div>
</div>
<div class="flex items-center gap-2 text-secondary">
<span class="font-label-sm text-label-sm font-semibold">Selected</span>
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
</div>
<!-- Option B -->
<div class="p-4 rounded-xl bg-surface-container-high/40 hover:bg-surface-container flex items-center justify-between cursor-pointer text-on-surface-variant transition-colors" data-choice="B">
<div class="flex items-center gap-3.5">
<span class="w-7 h-7 rounded-lg bg-surface-container text-outline flex items-center justify-center font-title-md text-title-md">B</span>
<div class="flex items-center gap-2">
<span class="font-mono text-sm">.iloc[]</span>
<span class="font-body-sm text-body-sm text-outline">— Pure integer-location based slicing</span>
</div>
</div>
<span class="w-4 h-4 rounded-full bg-surface-container"></span>
</div>
<!-- Option C -->
<div class="p-4 rounded-xl bg-surface-container-high/40 hover:bg-surface-container flex items-center justify-between cursor-pointer text-on-surface-variant transition-colors" data-choice="C">
<div class="flex items-center gap-3.5">
<span class="w-7 h-7 rounded-lg bg-surface-container text-outline flex items-center justify-center font-title-md text-title-md">C</span>
<div class="flex items-center gap-2">
<span class="font-mono text-sm">.filter()</span>
<span class="font-body-sm text-body-sm text-outline">— Subsets column or index labels by substring/regex</span>
</div>
</div>
<span class="w-4 h-4 rounded-full bg-surface-container"></span>
</div>
<!-- Option D -->
<div class="p-4 rounded-xl bg-surface-container-high/40 hover:bg-surface-container flex items-center justify-between cursor-pointer text-on-surface-variant transition-colors" data-choice="D">
<div class="flex items-center gap-3.5">
<span class="w-7 h-7 rounded-lg bg-surface-container text-outline flex items-center justify-center font-title-md text-title-md">D</span>
<div class="flex items-center gap-2">
<span class="font-mono text-sm">.query()</span>
<span class="font-body-sm text-body-sm text-outline">— String-expression evaluator with slight execution overhead</span>
</div>
</div>
<span class="w-4 h-4 rounded-full bg-surface-container"></span>
</div>
</div>
<!-- Instant Feedback Callout (Emerald Tinted State) -->
<div class="p-4 rounded-xl bg-secondary-container/15 flex items-start gap-3">
<span class="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">task_alt</span>
<div class="space-y-1">
<p class="font-title-md text-title-md text-secondary font-semibold">Correct! High-precision indexing verified.</p>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
<code class="text-secondary font-mono text-xs">.loc[]</code> natively consumes boolean mask arrays aligned to index labels and pairs seamlessly with column projections without risking ambiguous copy assignments.
                </p>
</div>
</div>
<!-- Quiz Actions -->
<div class="flex items-center justify-between pt-2">
<button class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-2 transition-colors" id="ask-ai-tutor-btn" type="button">
<span class="material-symbols-outlined text-[17px]">auto_awesome</span>
<span>Ask AI Tutor (Ollama) to Explain</span>
</button>
<button class="px-5 py-2 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary-container font-label-md text-label-md font-semibold flex items-center gap-2 transition-all shadow-md shadow-primary-container/20" id="next-question-btn" type="button">
<span>Next Question</span>
<span class="material-symbols-outlined text-[17px]">arrow_forward</span>
</button>
</div>
</section>
<!-- Additional bottom reading padding -->
<div class="h-6"></div>
</article>
</div>
<!-- Slim Sticky Bottom Bar (Height 56px, pinned at drawer bottom) -->
<footer class="h-14 min-h-[56px] bg-surface-container-low px-8 flex items-center justify-between z-20 shadow-lg">
<!-- Left: Previous Lesson -->
<button class="flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" id="prev-lesson-btn" type="button">
<span class="material-symbols-outlined text-[18px]">arrow_back</span>
<span>Prev: 2.1 NumPy Arrays</span>
</button>
<!-- Center: Mark Completed Action with Emerald Glow -->
<button class="px-6 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(78,222,163,0.35)] hover:shadow-[0_0_26px_rgba(78,222,163,0.5)] active:scale-[0.98]" id="mark-completed-btn" type="button">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span>Mark Completed</span>
</button>
<!-- Right: Next Lesson -->
<button class="flex items-center gap-2 text-primary hover:text-on-primary-container font-label-md text-label-md font-medium transition-colors" id="next-lesson-btn" type="button">
<span>Next: 2.3 Handling Missing Values</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</footer>
</section>
</div>
</div>
<script>
  (function() {
    // 1. Font Size Dropdown Toggle
    const fontToggle = document.getElementById('font-size-toggle');
    const fontMenu = document.getElementById('font-size-menu');
    if (fontToggle && fontMenu) {
      fontToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        fontMenu.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        if (!fontMenu.classList.contains('hidden')) fontMenu.classList.add('hidden');
      });
    }

    // 2. Fullscreen Drawer Toggle
    const fullscreenBtn = document.getElementById('fullscreen-reader-btn');
    const drawerSection = document.querySelector('section.w-4\\/5');
    const scrimArea = document.getElementById('scrim-close-area');
    let isFull = false;

    if (fullscreenBtn && drawerSection && scrimArea) {
      fullscreenBtn.addEventListener('click', () => {
        isFull = !isFull;
        if (isFull) {
          drawerSection.classList.remove('w-4/5');
          drawerSection.classList.add('w-full');
          scrimArea.classList.add('hidden');
          fullscreenBtn.querySelector('.material-symbols-outlined').textContent = 'fullscreen_exit';
        } else {
          drawerSection.classList.remove('w-full');
          drawerSection.classList.add('w-4/5');
          scrimArea.classList.remove('hidden');
          fullscreenBtn.querySelector('.material-symbols-outlined').textContent = 'fullscreen';
        }
      });
    }

    // 3. Close Drawer Handlers (Esc or Backdrop)
    const handleClose = () => {
      // Visual feedback on dismissal
      const overlayWrapper = drawerSection.closest('.select-text');
      if (overlayWrapper) {
        overlayWrapper.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        overlayWrapper.style.opacity = '0';
        overlayWrapper.style.transform = 'translateX(20px)';
        setTimeout(() => {
          overlayWrapper.style.display = 'none';
        }, 200);
      }
    };

    const closeBtn = document.getElementById('close-reader-btn');
    if (closeBtn) closeBtn.addEventListener('click', handleClose);
    if (scrimArea) scrimArea.addEventListener('click', handleClose);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') handleClose();
    });

    // 4. Code Block Copy Micro-interaction
    const copyBtn = document.getElementById('copy-code-btn');
    const copyLabel = document.getElementById('copy-label');
    if (copyBtn && copyLabel) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(`import pandas as pd
df = pd.DataFrame({'Country': ['DE', 'US', 'JP', 'FR'], 'Users': [4200, 18900, 7100, 3500], 'Retention': [0.82, 0.74, 0.91, 0.68]}).set_index('Country')
high_performers = df.loc[df['Retention'] > 0.80, ['Users', 'Retention']]
matrix_slice = df.iloc[0:2, 0:2]`);
        copyLabel.textContent = 'Copied!';
        setTimeout(() => {
          copyLabel.textContent = 'Copy Code';
        }, 1800);
      });
    }

    // 5. Quiz Choice Interactive Selection Simulation
    const optionCards = document.querySelectorAll('#quiz-options-group > div');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => {
          c.className = 'p-4 rounded-xl bg-surface-container-high/40 hover:bg-surface-container flex items-center justify-between cursor-pointer text-on-surface-variant transition-colors';
          const indicator = c.querySelector('.flex.items-center:last-child');
          if (indicator) indicator.innerHTML = '<span class="w-4 h-4 rounded-full bg-surface-container"></span>';
        });
        card.className = 'p-4 rounded-xl bg-surface-container flex items-center justify-between cursor-pointer ring-2 ring-secondary text-on-surface transition-all';
        const indicator = card.querySelector('.flex.items-center:last-child');
        if (indicator) {
          indicator.innerHTML = '<span class="font-label-sm text-label-sm font-semibold text-secondary">Selected</span><span class="material-symbols-outlined text-[20px] text-secondary" style="font-variation-settings: \'FILL\' 1;">check_circle</span>';
        }
      });
    });

    // 6. Completion Button Interactive Toggle
    const markCompletedBtn = document.getElementById('mark-completed-btn');
    let completed = false;
    if (markCompletedBtn) {
      markCompletedBtn.addEventListener('click', () => {
        completed = !completed;
        if (completed) {
          markCompletedBtn.classList.remove('bg-secondary', 'text-on-secondary');
          markCompletedBtn.classList.add('bg-secondary-container', 'text-on-secondary-container');
          markCompletedBtn.querySelector('span:last-child').textContent = 'Completed ✓';
        } else {
          markCompletedBtn.classList.remove('bg-secondary-container', 'text-on-secondary-container');
          markCompletedBtn.classList.add('bg-secondary', 'text-on-secondary');
          markCompletedBtn.querySelector('span:last-child').textContent = 'Mark Completed';
        }
      });
    }
  })();
</script></main>
</div>
<script>
    (function () {
      const newRoadmapBtn = document.getElementById('new-roadmap-btn');
      const newRoadmapMenu = document.getElementById('new-roadmap-menu');

      if (newRoadmapBtn && newRoadmapMenu) {
        newRoadmapBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          newRoadmapMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', function () {
          if (!newRoadmapMenu.classList.contains('hidden')) {
            newRoadmapMenu.classList.add('hidden');
          }
        });
      }

      const filterButtons = document.querySelectorAll('.filter-tab');
      const courseCards = document.querySelectorAll('.course-card');

      filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const filter = btn.getAttribute('data-filter');

          filterButtons.forEach(function (b) {
            b.classList.remove('bg-[#6366F1]', 'text-white');
            b.classList.add('text-[#9CA3AF]');
          });
          btn.classList.add('bg-[#6366F1]', 'text-white');
          btn.classList.remove('text-[#9CA3AF]');

          courseCards.forEach(function (card) {
            const status = card.getAttribute('data-status');
            if (filter === 'all' || status === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    })();
  </script>
</body></html>