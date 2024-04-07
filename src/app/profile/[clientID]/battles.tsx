import type { Battle, FighterIDs, PvpType } from "~/app/lib/definitions";
import Image from "next/image";
import { getBattles } from "~/app/lib/data";
import Link from "next/link";

type BattlesProps = {
  clientID: string;
};

export const Battles = async ({ clientID }: BattlesProps) => {
  const battles = await getBattles(clientID, { limit: 10 });

  return (
    <ul className="flex flex-col">
      {battles.items.map((battle) => (
        <Battle key={battle.uuid} battle={battle} />
      ))}
    </ul>
  );
};

type BattleProps = {
  battle: Battle;
};

async function Battle({ battle }: BattleProps) {
  const { clientID, createdAt, pvpType, team, uuid, winner } = battle;
  const isDraw = winner === "";
  const isPlayerWinner = winner === clientID;
  const playerFighterIDs = team.find((t) => t.owner === clientID)!.fighterIDs;
  const opponentTeam = team.find((t) => t.owner !== clientID)!;
  const { owner: opponentID, fighterIDs: opponentFighterIDs } = opponentTeam;
  const durationFromNow = calculateDurationFromNow(createdAt);

  return (
    <li className="flex">
      <Fighters fighterIDs={playerFighterIDs} />
      <div className="flex flex-col items-center">
        <BattleChip pvpType={pvpType} />
        <span
          className="text-lg font-bold"
          style={{ color: isDraw ? "gray" : isPlayerWinner ? "green" : "red" }}
        >
          {isDraw ? "draw" : isPlayerWinner ? "won" : "lost"}
        </span>
        <Duration durationFromNow={durationFromNow} />
        <a
          className="text-blue-500 underline"
          href={`https://cdn.axieinfinity.com/game/deeplink.html?f=rpl&q=${uuid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch
        </a>
      </div>
      <Fighters fighterIDs={opponentFighterIDs} />
      <button className="self-center rounded border border-black p-1">
        <Link href={`/profile/${opponentID}`}>👀</Link>
      </button>
    </li>
  );
}

const Duration = ({ durationFromNow }: { durationFromNow: number }) => (
  <span>
    {durationFromNow > 1000 * 60 * 60 * 24 ? (
      <span>{Math.floor(durationFromNow / (1000 * 60 * 60 * 24))}d</span>
    ) : durationFromNow > 1000 * 60 * 60 ? (
      <span>{Math.floor(durationFromNow / (1000 * 60 * 60))}h</span>
    ) : (
      <span>{Math.floor(durationFromNow / (1000 * 60))}m</span>
    )}
    &nbsp;ago
  </span>
);

type FightersProps = {
  fighterIDs: FighterIDs;
};

const Fighters = ({ fighterIDs }: FightersProps) => (
  <ul className="flex">
    {fighterIDs.map((fighterID) => (
      <li key={fighterID}>
        <a
          href={`https://app.axieinfinity.com/marketplace/axies/${fighterID}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            key={fighterID}
            width={150}
            height={100}
            className="object-contain"
            alt={`Axie #${fighterID}`}
            src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
          />
        </a>
      </li>
    ))}
  </ul>
);

type BattleChipProps = {
  pvpType: PvpType;
};

const BattleChip = ({ pvpType }: BattleChipProps) => (
  <div
    style={{
      backgroundColor: chipColorByPvpType(pvpType),
    }}
    className="rounded-lg px-2 text-white"
  >
    {pvpType}
  </div>
);

const chipColorByPvpType = (pvpType: PvpType) => {
  switch (pvpType) {
    case "tournament":
      return "#7057D0";
    case "arena":
      return "#EEA91D";
    case "colosseum":
      return "#E16E1C";
  }
};

const calculateDurationFromNow = (date: string) =>
  new Date().getTime() - new Date(date).getTime();
