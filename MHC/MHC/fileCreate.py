import asyncio, aiohttp, pandas as pd
from understat import Understat

seasons = ["2018", "2019", "2020", "2021", "2022", "2023"]  # Understat season labels
league = "EPL"
rows = []

async def main():
    async with aiohttp.ClientSession() as session:
        u = Understat(session)
        for s in seasons:
            data = await u.get_league_players(league=league, season=int(s))
            for p in data:
                rows.append({
                    "player": p["player_name"],
                    "season": f"{int(s)}-{int(s)+1}",
                    "team": p["team_title"],
                    "minutes": float(p["time"]) if p["time"] else 0,
                    "goals": float(p["goals"]) if p["goals"] else 0,
                    "xG": float(p["xG"]) if p["xG"] else 0,
                    "assists": float(p["assists"]) if p["assists"] else 0,
                    "xA": float(p["xA"]) if p["xA"] else 0,
                    "key_passes": float(p["key_passes"]) if p["key_passes"] else 0
                })
    df = pd.DataFrame(rows)
    df.to_csv("understat_pl_2018_2024.csv", index=False)
asyncio.run(main())
