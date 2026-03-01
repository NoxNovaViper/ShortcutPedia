/**
 * SHORTCUTPEDIA CORE LOGIC
 * Handles: OS switching, search, copy shortcut to clipboard
 */

let currentOS = 'win';

const shortcuts = {
    vscode: [
        { desc: "Command Palette", detail: "Access all commands", win: ["Ctrl","Shift","P"], mac: ["⌘","Shift","P"], linux: ["Ctrl","Shift","P"] },
        { desc: "Quick Open File", detail: "Jump to any file fast", win: ["Ctrl","P"], mac: ["⌘","P"], linux: ["Ctrl","P"] },
        { desc: "Toggle Terminal", detail: "Open/close integrated terminal", win: ["Ctrl","`"], mac: ["⌘","`"], linux: ["Ctrl","`"] },
        { desc: "Split Editor", detail: "Open side-by-side view", win: ["Ctrl","\\"], mac: ["⌘","\\"], linux: ["Ctrl","\\"] },
        { desc: "Go to Definition", detail: "Jump to where a symbol is defined", win: ["F12"], mac: ["F12"], linux: ["F12"] },
        { desc: "Find in Files", detail: "Search across all files", win: ["Ctrl","Shift","F"], mac: ["⌘","Shift","F"], linux: ["Ctrl","Shift","F"] },
        { desc: "Toggle Comment", detail: "Comment/uncomment selection", win: ["Ctrl","/"], mac: ["⌘","/"], linux: ["Ctrl","/"] },
        { desc: "Format Document", detail: "Auto-format the entire file", win: ["Shift","Alt","F"], mac: ["Shift","⌥","F"], linux: ["Ctrl","Shift","I"] },
        { desc: "Multi-cursor", detail: "Add cursor at next match", win: ["Ctrl","D"], mac: ["⌘","D"], linux: ["Ctrl","D"] },
        { desc: "Rename Symbol", detail: "Rename across all references", win: ["F2"], mac: ["F2"], linux: ["F2"] },
        { desc: "Close Editor", detail: "Close current tab", win: ["Ctrl","W"], mac: ["⌘","W"], linux: ["Ctrl","W"] },
        { desc: "Zen Mode", detail: "Distraction-free fullscreen", win: ["Ctrl","K","Z"], mac: ["⌘","K","Z"], linux: ["Ctrl","K","Z"] },
    ],
    windows: [
        { desc: "Open Search", detail: "Windows search bar", win: ["Win","S"], mac: ["⌘","Space"], linux: ["Super"] },
        { desc: "Virtual Desktop", detail: "Create new virtual desktop", win: ["Win","Ctrl","D"], mac: ["Ctrl","↑"], linux: ["Super","D"] },
        { desc: "Switch Desktop", detail: "Move between virtual desktops", win: ["Win","Ctrl","→"], mac: ["Ctrl","→"], linux: ["Super","→"] },
        { desc: "Snap Window Left", detail: "Snap window to left half", win: ["Win","←"], mac: ["Ctrl","⌥","←"], linux: ["Super","←"] },
        { desc: "Task Manager", detail: "Open task manager", win: ["Ctrl","Shift","Esc"], mac: ["⌘","Space"], linux: ["Ctrl","Alt","T"] },
        { desc: "Lock Screen", detail: "Lock your PC", win: ["Win","L"], mac: ["⌘","Ctrl","Q"], linux: ["Super","L"] },
        { desc: "File Explorer", detail: "Open file explorer", win: ["Win","E"], mac: ["⌘","N"], linux: ["Super","E"] },
        { desc: "Screenshot", detail: "Snip & Sketch capture", win: ["Win","Shift","S"], mac: ["⌘","Shift","4"], linux: ["PrtSc"] },
        { desc: "Settings", detail: "Open system settings", win: ["Win","I"], mac: ["⌘",","], linux: ["Super","I"] },
        { desc: "Run Dialog", detail: "Open Run command box", win: ["Win","R"], mac: ["⌘","Space"], linux: ["Alt","F2"] },
    ],
    excel: [
        { desc: "AutoSum", detail: "Sum selected range instantly", win: ["Alt","="], mac: ["⌘","Shift","T"], linux: ["Alt","="] },
        { desc: "Insert Function", detail: "Open function wizard", win: ["Shift","F3"], mac: ["Shift","F3"], linux: ["Shift","F3"] },
        { desc: "Fill Down", detail: "Copy cell to cells below", win: ["Ctrl","D"], mac: ["⌘","D"], linux: ["Ctrl","D"] },
        { desc: "Format Cells", detail: "Open format dialog", win: ["Ctrl","1"], mac: ["⌘","1"], linux: ["Ctrl","1"] },
        { desc: "Add Filter", detail: "Toggle AutoFilter on range", win: ["Ctrl","Shift","L"], mac: ["⌘","Shift","F"], linux: ["Ctrl","Shift","L"] },
        { desc: "New Sheet", detail: "Insert a new worksheet", win: ["Shift","F11"], mac: ["Shift","F11"], linux: ["Shift","F11"] },
        { desc: "Paste Special", detail: "Paste with options", win: ["Ctrl","Alt","V"], mac: ["⌘","Ctrl","V"], linux: ["Ctrl","Alt","V"] },
        { desc: "Absolute Reference", detail: "Toggle $A$1 reference lock", win: ["F4"], mac: ["⌘","T"], linux: ["F4"] },
        { desc: "Select Column", detail: "Select entire column", win: ["Ctrl","Space"], mac: ["Ctrl","Space"], linux: ["Ctrl","Space"] },
        { desc: "Hide Row", detail: "Hide selected rows", win: ["Ctrl","9"], mac: ["⌘","9"], linux: ["Ctrl","9"] },
        { desc: "Recalculate", detail: "Force recalculate all formulas", win: ["F9"], mac: ["F9"], linux: ["F9"] },
    ],
    chrome: [
        { desc: "New Tab", detail: "Open a blank tab", win: ["Ctrl","T"], mac: ["⌘","T"], linux: ["Ctrl","T"] },
        { desc: "Reopen Closed Tab", detail: "Undo closing a tab", win: ["Ctrl","Shift","T"], mac: ["⌘","Shift","T"], linux: ["Ctrl","Shift","T"] },
        { desc: "Address Bar", detail: "Focus the URL bar", win: ["Ctrl","L"], mac: ["⌘","L"], linux: ["Ctrl","L"] },
        { desc: "Dev Tools", detail: "Open developer tools", win: ["F12"], mac: ["⌘","⌥","I"], linux: ["F12"] },
        { desc: "Incognito Window", detail: "Open private browsing", win: ["Ctrl","Shift","N"], mac: ["⌘","Shift","N"], linux: ["Ctrl","Shift","N"] },
        { desc: "Find on Page", detail: "Search text on current page", win: ["Ctrl","F"], mac: ["⌘","F"], linux: ["Ctrl","F"] },
        { desc: "Zoom In", detail: "Increase page zoom", win: ["Ctrl","+"], mac: ["⌘","+"], linux: ["Ctrl","+"] },
        { desc: "Hard Refresh", detail: "Reload ignoring cache", win: ["Ctrl","Shift","R"], mac: ["⌘","Shift","R"], linux: ["Ctrl","Shift","R"] },
        { desc: "Bookmark Page", detail: "Save current page", win: ["Ctrl","D"], mac: ["⌘","D"], linux: ["Ctrl","D"] },
        { desc: "Next Tab", detail: "Switch to next tab", win: ["Ctrl","Tab"], mac: ["⌘","⌥","→"], linux: ["Ctrl","Tab"] },
        { desc: "View Source", detail: "View page HTML source", win: ["Ctrl","U"], mac: ["⌘","⌥","U"], linux: ["Ctrl","U"] },
    ],
    terminal: [
        { desc: "Clear Screen", detail: "Clear terminal output", win: ["Ctrl","L"], mac: ["Ctrl","L"], linux: ["Ctrl","L"] },
        { desc: "Interrupt Process", detail: "Stop running command", win: ["Ctrl","C"], mac: ["Ctrl","C"], linux: ["Ctrl","C"] },
        { desc: "Previous Command", detail: "Scroll through history", win: ["↑"], mac: ["↑"], linux: ["↑"] },
        { desc: "Search History", detail: "Reverse search command history", win: ["Ctrl","R"], mac: ["Ctrl","R"], linux: ["Ctrl","R"] },
        { desc: "Go to Line Start", detail: "Jump to start of line", win: ["Ctrl","A"], mac: ["Ctrl","A"], linux: ["Ctrl","A"] },
        { desc: "Go to Line End", detail: "Jump to end of line", win: ["Ctrl","E"], mac: ["Ctrl","E"], linux: ["Ctrl","E"] },
        { desc: "Delete Word", detail: "Delete previous word", win: ["Ctrl","W"], mac: ["Ctrl","W"], linux: ["Ctrl","W"] },
        { desc: "New Tab (Terminal)", detail: "Open new terminal tab", win: ["Ctrl","Shift","T"], mac: ["⌘","T"], linux: ["Ctrl","Shift","T"] },
        { desc: "Paste", detail: "Paste clipboard text", win: ["Ctrl","Shift","V"], mac: ["⌘","V"], linux: ["Ctrl","Shift","V"] },
        { desc: "Exit", detail: "Close terminal session", win: ["Ctrl","D"], mac: ["Ctrl","D"], linux: ["Ctrl","D"] },
    ],
    git: [
        { desc: "Initialize Repo", detail: "Create a new local git repo", win: ["git init"], mac: ["git init"], linux: ["git init"] },
        { desc: "Clone Repo", detail: "Copy a remote repo locally", win: ["git clone <url>"], mac: ["git clone <url>"], linux: ["git clone <url>"] },
        { desc: "Stage All Changes", detail: "Add all files to staging", win: ["git add ."], mac: ["git add ."], linux: ["git add ."] },
        { desc: "Commit", detail: "Save staged changes with message", win: ["git commit -m"], mac: ["git commit -m"], linux: ["git commit -m"] },
        { desc: "Push", detail: "Upload commits to remote", win: ["git push"], mac: ["git push"], linux: ["git push"] },
        { desc: "Pull", detail: "Fetch and merge remote changes", win: ["git pull"], mac: ["git pull"], linux: ["git pull"] },
        { desc: "Check Status", detail: "See staged and unstaged changes", win: ["git status"], mac: ["git status"], linux: ["git status"] },
        { desc: "View Log", detail: "See commit history", win: ["git log --oneline"], mac: ["git log --oneline"], linux: ["git log --oneline"] },
        { desc: "Create Branch", detail: "Make a new branch", win: ["git checkout -b"], mac: ["git checkout -b"], linux: ["git checkout -b"] },
        { desc: "Switch Branch", detail: "Move to another branch", win: ["git checkout <branch>"], mac: ["git checkout <branch>"], linux: ["git checkout <branch>"] },
        { desc: "Merge Branch", detail: "Merge a branch into current", win: ["git merge <branch>"], mac: ["git merge <branch>"], linux: ["git merge <branch>"] },
        { desc: "Undo Last Commit", detail: "Keep changes but undo commit", win: ["git reset --soft HEAD~1"], mac: ["git reset --soft HEAD~1"], linux: ["git reset --soft HEAD~1"] },
        { desc: "Stash Changes", detail: "Temporarily save uncommitted work", win: ["git stash"], mac: ["git stash"], linux: ["git stash"] },
        { desc: "View Diff", detail: "See unstaged changes", win: ["git diff"], mac: ["git diff"], linux: ["git diff"] },
    ],
    figma: [
        { desc: "Scale Object", detail: "Resize proportionally", win: ["K"], mac: ["K"], linux: ["K"] },
        { desc: "Frame Tool", detail: "Create a new frame", win: ["F"], mac: ["F"], linux: ["F"] },
        { desc: "Rectangle Tool", detail: "Draw a rectangle", win: ["R"], mac: ["R"], linux: ["R"] },
        { desc: "Text Tool", detail: "Add a text layer", win: ["T"], mac: ["T"], linux: ["T"] },
        { desc: "Pen Tool", detail: "Draw custom paths", win: ["P"], mac: ["P"], linux: ["P"] },
        { desc: "Component", detail: "Create a reusable component", win: ["Ctrl","Alt","K"], mac: ["⌘","⌥","K"], linux: ["Ctrl","Alt","K"] },
        { desc: "Group Selection", detail: "Group selected layers", win: ["Ctrl","G"], mac: ["⌘","G"], linux: ["Ctrl","G"] },
        { desc: "Ungroup", detail: "Ungroup selected group", win: ["Ctrl","Shift","G"], mac: ["⌘","Shift","G"], linux: ["Ctrl","Shift","G"] },
        { desc: "Zoom to Fit", detail: "Fit entire canvas in view", win: ["Shift","1"], mac: ["Shift","1"], linux: ["Shift","1"] },
        { desc: "Toggle Rulers", detail: "Show/hide rulers", win: ["Shift","R"], mac: ["Shift","R"], linux: ["Shift","R"] },
        { desc: "Flatten Selection", detail: "Merge layers into one", win: ["Ctrl","E"], mac: ["⌘","E"], linux: ["Ctrl","E"] },
        { desc: "Copy Properties", detail: "Copy style to clipboard", win: ["Ctrl","Alt","C"], mac: ["⌘","⌥","C"], linux: ["Ctrl","Alt","C"] },
        { desc: "Paste Properties", detail: "Apply copied style", win: ["Ctrl","Alt","V"], mac: ["⌘","⌥","V"], linux: ["Ctrl","Alt","V"] },
    ],
    notion: [
        { desc: "New Page", detail: "Create a new page", win: ["Ctrl","N"], mac: ["⌘","N"], linux: ["Ctrl","N"] },
        { desc: "Search", detail: "Quick find any page", win: ["Ctrl","P"], mac: ["⌘","P"], linux: ["Ctrl","P"] },
        { desc: "Toggle Dark Mode", detail: "Switch light/dark theme", win: ["Ctrl","Shift","L"], mac: ["⌘","Shift","L"], linux: ["Ctrl","Shift","L"] },
        { desc: "Heading 1", detail: "Turn line into H1", win: ["Ctrl","Alt","1"], mac: ["⌘","⌥","1"], linux: ["Ctrl","Alt","1"] },
        { desc: "Heading 2", detail: "Turn line into H2", win: ["Ctrl","Alt","2"], mac: ["⌘","⌥","2"], linux: ["Ctrl","Alt","2"] },
        { desc: "Bullet List", detail: "Start a bulleted list", win: ["Ctrl","Alt","4"], mac: ["⌘","⌥","4"], linux: ["Ctrl","Alt","4"] },
        { desc: "Toggle Block", detail: "Create collapsible toggle", win: ["Ctrl","Alt","7"], mac: ["⌘","⌥","7"], linux: ["Ctrl","Alt","7"] },
        { desc: "Bold", detail: "Bold selected text", win: ["Ctrl","B"], mac: ["⌘","B"], linux: ["Ctrl","B"] },
        { desc: "Inline Code", detail: "Format as inline code", win: ["Ctrl","E"], mac: ["⌘","E"], linux: ["Ctrl","E"] },
        { desc: "Insert Date", detail: "Mention today's date", win: ["@today"], mac: ["@today"], linux: ["@today"] },
        { desc: "Duplicate Block", detail: "Copy current block below", win: ["Ctrl","D"], mac: ["⌘","D"], linux: ["Ctrl","D"] },
        { desc: "Move Block Up", detail: "Move block up one position", win: ["Ctrl","Shift","↑"], mac: ["⌘","Shift","↑"], linux: ["Ctrl","Shift","↑"] },
    ],
};

function renderShortcuts(category, os) {
    const container = document.getElementById(`${category}-list`);
    if (!container) return;

    const items = shortcuts[category];
    if (!items) return;

    container.innerHTML = items.map(item => {
        const keys = item[os] || item.win;
        const keysHTML = keys.map((k, i) =>
            `<kbd>${k}</kbd>${i < keys.length - 1 ? '<span class="key-plus">+</span>' : ''}`
        ).join('');
        const keysText = keys.join(' + ');

        return `
        <div class="shortcut-row">
            <div class="shortcut-desc">
                ${item.desc}
                ${item.detail ? `<small>${item.detail}</small>` : ''}
            </div>
            <div class="keys">${keysHTML}</div>
            <button class="copy-keys-btn" onclick="copyShortcut('${keysText}', this)">copy</button>
        </div>`;
    }).join('');
}

function renderAll(os) {
    Object.keys(shortcuts).forEach(cat => renderShortcuts(cat, os));
}

async function copyShortcut(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        btn.style.borderColor = 'var(--accent)';
        btn.style.color = 'var(--accent)';
        setTimeout(() => {
            btn.textContent = orig;
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 2000);
    } catch {
        btn.textContent = 'err';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderAll('win');

    const osBtns = document.querySelectorAll('.os-btn');
    osBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            osBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentOS = btn.dataset.os;
            renderAll(currentOS);
        });
    });

    const searchBox = document.getElementById('search');
    if (searchBox) {
        searchBox.addEventListener('input', () => {
            const term = searchBox.value.toLowerCase();
            document.querySelectorAll('.shortcut-row').forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(term) ? 'flex' : 'none';
            });
            document.querySelectorAll('section').forEach(sec => {
                const visible = [...sec.querySelectorAll('.shortcut-row')].some(r => r.style.display !== 'none');
                sec.style.display = term ? (visible ? 'block' : 'none') : 'block';
            });
        });
    }
});

window.copyShortcut = copyShortcut;
