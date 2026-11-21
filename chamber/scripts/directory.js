const memberContainer = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const menuBtn = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

menuBtn.addEventListener("click", () => {
    primaryNav.classList.toggle("open");
});

gridBtn.addEventListener("click", () => {
    memberContainer.classList.add("grid");
    memberContainer.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    memberContainer.classList.add("list");
    memberContainer.classList.remove("grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});
async function getMembers() {
    try{
        const response = await fetch("data/members.json");
        if (!response.ok) throw new console.Error("Failed to fetch member data");
        const data = await response.json();
        displayMembers(data.members);  
    } catch (error) {
        console.error("Error loading members: ", error);
    }
    
}
function getMembershipLabel(level) {
    if (level === 3) return "Gold Member";
    if (level === 2) return "Silver Member";
    return "Member";
}

function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}<h3>
        <p>${member.address}<p>
        <p>${member.phone}<p>
        <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a>
        <span class="badge">${getMembershipLabel(member.membershipLevel)}</span>
        `;
        memberContainer.appendChild(card);
    });

}
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();