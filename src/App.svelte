<script lang="ts">
  import Icon from "@iconify/svelte";
  import pythonBasics from "./generators/python/basics";
  import { createHighlighter } from "shiki";
  import type { Action } from "svelte/action";
  import { linesCounter, symbolsCounter } from "./counters";
  import jsBasics from "./generators/javascript/basics";
  import pythonLoops from "./generators/python/loops";

  const themes = [
    {
      name: "github-dark",
      title: "Github Dark",
    },
    {
      name: "one-dark-pro",
      title: "One Dark Pro",
    },
    {
      name: "houston",
      title: "Houston",
    },
  ];

  const localTheme = localStorage.getItem("theme");
  let theme = $state(localTheme ? localTheme : themes[0].name);

  const languages = [
    {
      name: "python",
      title: "Python",
      icon: "devicon:python",
      modes: [
        { name: "basics", title: "Basics", generator: pythonBasics },
        { name: "loops", title: "Loops", generator: pythonLoops },
      ],
    },
    {
      name: "javascript",
      title: "JavaScript",
      icon: "devicon:javascript",
      modes: [{ name: "basics", title: "Basics", generator: jsBasics }],
    },
  ];

  const localLang = localStorage.getItem("lang");
  const localMode = localStorage.getItem("mode");
  let lang = $state(localLang ? localLang : "python");
  let mode = $state(localMode ? localMode : "basics");

  $effect(() => {
    localStorage.setItem("lang", lang);
    localStorage.setItem("mode", mode);
    localStorage.setItem("theme", theme);
  });

  let text = $state("");
  let input = $state("");
  let count = $state(0);

  $effect(() => {
    if (mode && !text) {
      text = languages
        .find((l) => l.name == lang)!
        .modes.find((m) => m.name == mode)!
        .generator();
    } else if (text) {
      if (input == text) {
        symbolsCounter.increase(text.length);
        text = "";
        input = "";
        count += 1;
        linesCounter.increase();
      }
    }
  });

  const selectLanguage = (l: string) => {
    lang = l;
    mode = languages.find((l) => l.name == lang)!.modes[0].name;
    text = "";
    input = "";
    count = 0;
  };
  const selectMode = (m: string) => {
    mode = m;
    text = "";
    input = "";
    count = 0;
  };
  const selectTheme = (t: string) => {
    theme = t;
  };

  const init: Action = (el) => {
    el.focus();
  };
</script>

<svelte:window onclick={() => init(document.getElementById("input")!)} />

{#await createHighlighter( { langs: languages.map((l) => l.name), themes: themes.map((t) => t.name) } ) then highlighter}
  <div class="px-5 py-32 space-y-3 text-5xl">
    <div class="">
      {@html highlighter.codeToHtml(text, {
        lang,
        theme,
      })}
    </div>
    <div class="flex items-center gap-2">
      <div class="text-neutral-700">{count + 1}.</div>
      <input
        type="text"
        bind:value={input}
        class:text-error={!text.startsWith(input)}
        use:init
        placeholder="..."
        class="w-full"
        id="input"
        autocomplete="off"
      />
    </div>
  </div>
{/await}

<div class="p-5 grid gap-5 lg:grid-cols-2">
  <div class="space-y-2">
    <div class="text-hint text-sm">language</div>
    <div class="flex gap-2 items-center">
      {#each languages as l}
        <button
          class="px-2 py-1 flex items-center gap-2 rounded-lg border border-border"
          class:bg-accent={lang == l.name}
          class:bg-secondary={lang != l.name}
          onclick={() => selectLanguage(l.name)}
        >
          <Icon icon={l.icon} />
          <div>{l.title}</div>
        </button>
      {/each}
    </div>
  </div>

  <div class="space-y-2">
    <div class="text-hint text-sm">mode</div>
    <div class="flex gap-2 items-center">
      {#each languages.find((l) => l.name == lang)!.modes as m}
        <button
          class="px-2 py-1 flex items-center gap-2 rounded-lg border border-border"
          class:bg-accent={mode == m.name}
          class:bg-secondary={mode != m.name}
          onclick={() => selectMode(m.name)}
        >
          <div>{m.title}</div>
        </button>
      {/each}
    </div>
  </div>

  <div class="col-span-full"></div>

  <div class="space-y-2">
    <div class="text-hint text-sm">colors</div>
    <div class="flex gap-2 items-center">
      {#each themes as t}
        <button
          class="px-2 py-1 flex items-center gap-2 bg-secondary rounded-lg border border-border"
          class:bg-accent={theme == t.name}
          class:bg-secondary={theme != t.name}
          onclick={() => selectTheme(t.name)}
        >
          <div>{t.title}</div>
        </button>
      {/each}
    </div>
  </div>

  <div class="space-y-2">
    <div class="text-sm text-hint">statistics</div>
    <div class="grid md:gap-3 md:grid-cols-2 text-sm">
      <div>
        <span class="text-lg">{$linesCounter}</span> lines of code done
      </div>
      <div>
        <span class="text-lg">{$symbolsCounter}</span> symbols of code typed
      </div>
    </div>
  </div>
</div>

<div class="p-5">
  <div class="text-hint text-sm">
    by <a href="https://mckoda09.ru" class="underline hover:text-primary">
      mckoda09
    </a> with ❤️
  </div>
</div>

<div
  class="absolute top-0 left-0 w-full h-dvh bg-[url('./bg.svg')] bg-cover bg-center -z-50 opacity-70"
></div>
