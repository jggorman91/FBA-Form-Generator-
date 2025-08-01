// --- Data Constants ---
const COMMON_BEHAVIORS = [
    "Off-task behavior",
    "Elopement (leaving designated area)",
    "Physical aggression toward peers/staff",
    "Verbal outbursts / Inappropriate language",
    "Property destruction",
    "Non-compliance / Refusal to follow directions",
    "Self-injurious behavior",
];

const ANTECEDENTS = [
    "Given instruction or task demand",
    "Difficult task/work presented",
    "Transition between activities/settings",
    "Peer conflict or negative interaction",
    "Adult attention was withdrawn or diverted",
    "Denied access to preferred item/activity",
    "Unstructured time / Low stimulation",
];

const CONSEQUENCES = [
    "Adult attention given (verbal reprimand, redirection)",
    "Peer attention given (positive or negative)",
    "Task was avoided, delayed, or removed",
    "Obtained preferred item/activity",
    "Natural consequence occurred",
    "Ignored / No response",
    "Item/activity was removed",
];

const LOCATIONS = [
    "Regular Classroom", "Special Education Classroom", "Hallway",
    "Cafeteria", "Playground", "Bus", "Specials (Art, Music, PE)"
];

// --- Function to populate the behavior list on page load ---
window.onload = function() {
    const behaviorListDiv = document.getElementById('behavior-list');
    if (!behaviorListDiv) return; // Exit if the element doesn't exist

    COMMON_BEHAVIORS.forEach((behavior, index) => {
        const checkboxId = `behavior-${index}`;
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="checkbox" id="${checkboxId}" value="${behavior}" class="hidden behavior-checkbox">
            <label for="${checkboxId}" class="block p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-200 transition text-sm">
                ${behavior}
            </label>
        `;
        behaviorListDiv.appendChild(div);
    });
};

// --- Main form generation logic ---
function generateForm() {
    // 1. Get selected behaviors
    const selectedBehaviors = [];
    document.querySelectorAll('#behavior-list input[type="checkbox"]:checked').forEach(checkbox => {
        selectedBehaviors.push(checkbox.value);
    });

    // 2. Get custom behavior
    const customBehavior = document.getElementById('custom-behavior').value.trim();
    
    const allBehaviors = [...selectedBehaviors];
    if (customBehavior) {
        allBehaviors.push(customBehavior);
    }

    if (allBehaviors.length === 0) {
        alert("Please select at least one behavior or add a custom one.");
        return;
    }

    // 3. Build the form text
    let formText = `
==================================================
        FBA DIRECT OBSERVATION FORM
==================================================

PART 1: BASIC INFORMATION
--------------------------------------------------
Student Name: _________________________
Observer Name: ________________________
Date: _________________ Time: __________
Location/Activity: ${LOCATIONS.join(', ')}, Other: ________

PART 2: BEHAVIOR
--------------------------------------------------
Observed Behavior (Select one):
`;
    allBehaviors.forEach(b => {
        formText += `  ( ) ${b}\n`;
    });

    formText += `
Behavior Description (Objective & Observable):
_________________________________________________________________
_________________________________________________________________

PART 3: A-B-C DATA
--------------------------------------------------
Antecedent (What happened BEFORE? Check all that apply):
`;
    ANTECEDENTS.forEach(a => {
        formText += `  [ ] ${a}\n`;
    });
    formText += `  [ ] Other: __________________\n`;

    formText += `\nConsequence (What happened AFTER? Check all that apply):\n`;
    CONSEQUENCES.forEach(c => {
        formText += `  [ ] ${c}\n`;
    });
    formText += `  [ ] Other: __________________\n`;

    formText += `
PART 4: DIRECT MEASUREMENT
--------------------------------------------------
Frequency (Count): ________
Duration (in minutes): ________

PART 5: ADDITIONAL NOTES
--------------------------------------------------
_________________________________________________________________
_________________________________________________________________

==================================================
`;
    // 4. Display the output
    const outputSection = document.getElementById('output-section');
    const formOutputTextarea = document.getElementById('form-output');
    
    formOutputTextarea.value = formText.trim();
    outputSection.classList.remove('hidden');
    
    // Scroll to the output
    outputSection.scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard() {
    const textarea = document.getElementById('form-output');
    textarea.select();
    // Using execCommand for broader browser compatibility in this context
    try {
        document.execCommand('copy');
        const successMsg = document.getElementById('copy-success');
        successMsg.textContent = 'Copied to clipboard!';
        setTimeout(() => { successMsg.textContent = ''; }, 2000);
    } catch (err) {
        alert('Failed to copy text.');
    }
}
