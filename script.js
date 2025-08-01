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

    // 3. Build the form text as a script for Google/Microsoft Forms
    let formText = `FORM TITLE: FBA Direct Observation Form\n\n`;
    formText += `FORM DESCRIPTION: This form is used to collect direct observation data (ABC, frequency, duration) to help determine the function of a student's behavior.\n\n`;
    formText += `--------------------------------------------------\n\n`;

    formText += `--- SECTION: Basic Information ---\n\n`;
    formText += `1. Question: Student Name\n   - Type: Short Answer\n\n`;
    formText += `2. Question: Observer Name\n   - Type: Short Answer\n\n`;
    formText += `3. Question: Date of Observation\n   - Type: Date\n\n`;
    formText += `4. Question: Time of Observation\n   - Type: Short Answer\n\n`;
    formText += `5. Question: Location/Activity\n   - Type: Multiple Choice\n   - Options: ${LOCATIONS.join(', ')}, Other\n\n`;

    formText += `--- SECTION: Behavior Details ---\n\n`;
    formText += `6. Question: Observed Behavior\n   - Type: Multiple Choice\n   - Options: ${allBehaviors.join(', ')}\n\n`;
    formText += `7. Question: Behavior Description (Objective & Observable)\n   - Type: Paragraph\n\n`;

    formText += `--- SECTION: A-B-C Data ---\n\n`;
    formText += `8. Question: Antecedent (What happened BEFORE?)\n   - Type: Checkboxes (Select all that apply)\n   - Options: ${ANTECEDENTS.join(', ')}, Other\n\n`;
    formText += `9. Question: Consequence (What happened AFTER?)\n   - Type: Checkboxes (Select all that apply)\n   - Options: ${CONSEQUENCES.join(', ')}, Other\n\n`;

    formText += `--- SECTION: Direct Measurement ---\n\n`;
    formText += `10. Question: Frequency (Count)\n    - Type: Short Answer (Number)\n\n`;
    formText += `11. Question: Duration (in minutes)\n    - Type: Short Answer (Number)\n\n`;
    
    formText += `--- SECTION: Additional Notes ---\n\n`;
    formText += `12. Question: Additional Notes\n    - Type: Paragraph\n\n`;

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
