# Premier League Top Creators (2018–19 to 2023–24)
# Horizontal bar chart highlighting Kevin De Bruyne (KDB).
# Output: kdb_top_creators_2018_2024.png

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Patch

# -----------------------------
# DATA (replace with verified totals if available)
# -----------------------------
players = [
    "Kevin De Bruyne",
    "Trent Alexander-Arnold",
    "Bruno Fernandes",
    "Mohamed Salah",
    "James Maddison",
    "Jack Grealish",
    "Martin Ødegaard",
    "Kieran Trippier",
    "Bernardo Silva",
    "Heung-min Son",
]

# Placeholder totals; update with real data if you have it.
chances_created = [451, 420, 410, 380, 365, 350, 340, 330, 320, 315]

# -----------------------------
# STYLING AND PREP
# -----------------------------
plt.style.use("seaborn-v0_8-whitegrid")

# Highlight KDB
colors = ["#ff7f0e" if p == "Kevin De Bruyne" else "#1f77b4" for p in players]

# Sort by value descending
order = np.argsort(chances_created)[::-1]
players_sorted = [players[i] for i in order]
values_sorted = [chances_created[i] for i in order]
colors_sorted = [colors[i] for i in order]

# -----------------------------
# PLOT
# -----------------------------
fig, ax = plt.subplots(figsize=(10, 6), dpi=150)
bars = ax.barh(players_sorted, values_sorted, color=colors_sorted, edgecolor="white")
ax.invert_yaxis()  # Put largest at the top

# Labels on each bar
offset = max(values_sorted) * 0.01
for b, v in zip(bars, values_sorted):
    ax.text(v + offset, b.get_y() + b.get_height()/2, f"{v}", va="center", ha="left", fontsize=10)

# Titles and labels
ax.set_title(
    "Premier League Top Creators (2018–19 to 2023–24)\nChances Created — Highlighting Kevin De Bruyne",
    fontsize=14, weight="bold"
)
ax.set_xlabel("Total chances created")
ax.set_ylabel("Player")

# Legend
legend_elements = [
    Patch(facecolor="#ff7f0e", edgecolor="white", label="Kevin De Bruyne"),
    Patch(facecolor="#1f77b4", edgecolor="white", label="Other top creators"),
]
ax.legend(handles=legend_elements, loc="lower right")

plt.tight_layout()
output_file = "kdb_top_creators_2018_2024.png"
plt.savefig(output_file, bbox_inches="tight")
print(f"Saved chart to {output_file}")
