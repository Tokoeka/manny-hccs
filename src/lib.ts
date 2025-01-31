import {
  abort,
  adv1,
  autosell,
  availableAmount,
  buy,
  buyUsingStorage,
  chatPrivate,
  choiceFollowsFight,
  cliExecute,
  create,
  eat,
  Effect,
  equip,
  familiarWeight,
  getClanName,
  getFuel,
  getProperty,
  haveEffect,
  haveSkill,
  inMultiFight,
  Item,
  itemAmount,
  Location,
  Monster,
  myAdventures,
  myFamiliar,
  myLocation,
  myMaxmp,
  myMp,
  print,
  pullsRemaining,
  putShop,
  retrieveItem,
  setProperty,
  shopAmount,
  Skill,
  storageAmount,
  takeShop,
  toEffect,
  toInt,
  toString as toStringAsh,
  totalTurnsPlayed,
  toUrl,
  use,
  useSkill,
  visitUrl,
  wait,
  weightAdjustment,
} from "kolmafia";
import { $effect, $effects, $item, $location, $skill, get, Macro, property } from "libram";

export function getPropertyInt(name: string) {
  const str = getProperty(name);
  if (str === "") {
    throw `Unknown property ${name}.`;
  }
  return toInt(str);
}

export function setPropertyInt(name: string, value: number) {
  setProperty(name, `${value}`);
}

export function incrementProperty(name: string) {
  setPropertyInt(name, getPropertyInt(name) + 1);
}

export function getPropertyBoolean(name: string) {
  const str = getProperty(name);
  if (str === "") {
    throw `Unknown property ${name}.`;
  }
  return str === "true";
}

export function setChoice(adv: number, choice: number) {
  setProperty(`choiceAdventure${adv}`, `${choice}`);
}

export function multiFightAutoAttack(): void {
  while (choiceFollowsFight() || inMultiFight()) {
    visitUrl("choice.php");
  }
}

export function myFamiliarWeight() {
  return familiarWeight(myFamiliar()) + weightAdjustment();
}

export function ensureItem(quantity: number, it: Item) {
  if (availableAmount(it) < quantity) {
    buy(quantity - availableAmount(it), it);
  }
  if (availableAmount(it) < quantity) {
    throw `Could not buy ${quantity} of item ${it.name}: only ${availableAmount(it)}.`;
  }
}

export function ensureCreateItem(quantity: number, it: Item) {
  if (availableAmount(it) < quantity) {
    create(quantity - availableAmount(it), it);
  }
  if (availableAmount(it) < quantity) {
    throw "Could not create item.";
  }
}

export function ensureSewerItem(quantity: number, it: Item) {
  while (availableAmount(it) < quantity) {
    ensureItem(1, $item`chewing gum on a string`);
    use(1, $item`chewing gum on a string`);
  }
}

export function ensureHermitItem(quantity: number, it: Item) {
  if (availableAmount(it) >= quantity) {
    return;
  }
  const count = quantity - availableAmount(it);
  while (
    availableAmount($item`worthless trinket`) +
      availableAmount($item`worthless gewgaw`) +
      availableAmount($item`worthless knick-knack`) <
    count
  ) {
    ensureItem(1, $item`chewing gum on a string`);
    use(1, $item`chewing gum on a string`);
  }
  ensureItem(1, $item`hermit permit`);
  retrieveItem(count, it);
}

export function ensureNpcEffect(ef: Effect, quantity: number, potion: Item) {
  if (haveEffect(ef) === 0) {
    ensureItem(quantity, potion);
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw `Failed to get effect ${ef.name}`;
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensurePotionEffect(ef: Effect, potion: Item) {
  if (haveEffect(ef) === 0) {
    if (availableAmount(potion) === 0) {
      create(1, potion);
    }
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureEffect(ef: Effect, turns = 1) {
  if (haveEffect(ef) < turns) {
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureMpTonic(mp: number) {
  while (myMp() < mp) {
    ensureItem(1, $item`Doc Galaktik's Invigorating Tonic`);
    use(1, $item`Doc Galaktik's Invigorating Tonic`);
  }
}

export function ensureMpSausage(mp: number) {
  while (myMp() < Math.min(mp, myMaxmp())) {
    ensureCreateItem(1, $item`magical sausage`);
    eat(1, $item`magical sausage`);
  }
}

export function sausageFightGuaranteed() {
  const goblinsFought = getPropertyInt("_sausageFights");
  const nextGuaranteed =
    getPropertyInt("_lastSausageMonsterTurn") +
    4 +
    goblinsFought * 3 +
    Math.max(0, goblinsFought - 5) ** 3;
  return goblinsFought === 0 || totalTurnsPlayed() >= nextGuaranteed;
}

export function itemPriority(...items: Item[]) {
  return items.find((item: Item) => availableAmount(item) > 0) ?? items[items.length - 1];
}

export function setClan(target: string) {
  if (getClanName() !== target) {
    const clanCache = JSON.parse(getProperty("hccs_clanCache") || "{}");
    if (clanCache.target === undefined) {
      const recruiter = visitUrl("clan_signup.php");
      const clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      let match;
      while ((match = clanRe.exec(recruiter)) !== null) {
        clanCache[match[2]] = match[1];
      }
    }
    setProperty("hccs_clanCache", JSON.stringify(clanCache));

    visitUrl(`showclan.php?whichclan=${clanCache[target]}&action=joinclan&confirm=on&pwd`);
    if (getClanName() !== target) {
      throw `failed to switch clans to ${target}. Did you spell it correctly? Are you whitelisted?`;
    }
  }
  return true;
}

export function ensureDough(goal: number) {
  while (availableAmount($item`wad of dough`) < goal) {
    buy(1, $item`all-purpose flower`);
    use(1, $item`all-purpose flower`);
  }
}

export function fuelAsdon(goal: number) {
  const startingFuel = getFuel();
  if (startingFuel > goal) return startingFuel;

  print(`Fueling asdon. Currently ${startingFuel} litres.`);
  const estimated = Math.floor((goal - startingFuel) / 5);
  const bread = availableAmount($item`loaf of soda bread`);
  ensureDough(estimated - bread);
  ensureItem(estimated - bread, $item`soda water`);
  ensureCreateItem(estimated, $item`loaf of soda bread`);
  cliExecute(`asdonmartin fuel ${estimated} loaf of soda bread`);
  while (getFuel() < goal) {
    ensureDough(1);
    ensureItem(1, $item`soda water`);
    ensureCreateItem(1, $item`loaf of soda bread`);
    cliExecute("asdonmartin fuel 1 loaf of soda bread");
  }
  const endingFuel = getFuel();
  print(`Done fueling. Now ${endingFuel} litres.`);
  return endingFuel;
}

export function ensureAsdonEffect(ef: Effect) {
  if (haveEffect(ef) === 0) {
    fuelAsdon(37);
  }
  ensureEffect(ef);
}

export function mapMonster(location: Location, monster: Monster) {
  if (
    haveSkill($skill`Map the Monsters`) &&
    !getPropertyBoolean("mappingMonsters") &&
    getPropertyInt("_monstersMapped") < 3
  ) {
    useSkill($skill`Map the Monsters`);
  }

  if (!getPropertyBoolean("mappingMonsters")) throw "Failed to setup Map the Monsters.";

  const mapPage = visitUrl(toUrl(location), false, true);
  if (!mapPage.includes("Leading Yourself Right to Them")) throw "Something went wrong mapping.";

  const fightPage = visitUrl(
    `choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=${monster.id}`
  );
  if (!fightPage.includes("You're fighting") && myLocation() !== $location`The Haiku Dungeon`)
    throw "Something went wrong starting the fight.";
}

export function tryUse(quantity: number, it: Item) {
  if (availableAmount(it) > 0) {
    return use(quantity, it);
  } else {
    return false;
  }
}

export function tryEquip(it: Item) {
  if (availableAmount(it) > 0) {
    return equip(it);
  } else {
    return false;
  }
}

export function wishEffect(ef: Effect) {
  if (haveEffect(ef) === 0) {
    cliExecute(`genie effect ${ef.name}`);
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function pullIfPossible(quantity: number, it: Item, maxPrice: number) {
  if (pullsRemaining() > 0) {
    const quantityPull = Math.max(0, quantity - availableAmount(it));
    if (shopAmount(it) > 0) {
      takeShop(Math.min(shopAmount(it), quantityPull), it);
    }
    if (storageAmount(it) < quantityPull) {
      buyUsingStorage(quantityPull - storageAmount(it), it, maxPrice);
    }
    cliExecute(`pull ${quantityPull} ${it.name}`);
    return true;
  } else return false;
}

export function ensurePullEffect(ef: Effect, it: Item) {
  if (haveEffect(ef) === 0) {
    if (availableAmount(it) > 0 || pullIfPossible(1, it, 50000)) ensureEffect(ef);
  }
}

export function shrug(ef: Effect) {
  if (haveEffect(ef) > 0) {
    cliExecute(`shrug ${ef.name}`);
  }
}

// We have Stevedave's, Ur-Kel's on at all times during leveling (managed via mood); third and fourth slots are variable.
const songSlots = [
  $effects`Stevedave's Shanty of Superiority`,
  $effects`Ur-Kel's Aria of Annoyance`,
  $effects`Power Ballad of the Arrowsmith, The Magical Mojomuscular Melody, The Moxious Madrigal, Ode to Booze, Jackasses' Symphony of Destruction`,
  $effects`Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Fat Leon's Phat Loot Lyric, Polka of Plenty`,
];
const allKnownSongs = ([] as Effect[]).concat(...songSlots);
const allSongs = Skill.all()
  .filter(
    (skill) => toStringAsh(skill.class as unknown as string) === "Accordion Thief" && skill.buff
  )
  .map((skill) => toEffect(skill));
export function openSongSlot(song: Effect) {
  for (const songSlot of songSlots) {
    if (songSlot.includes(song)) {
      for (const shruggable of songSlot) {
        shrug(shruggable);
      }
    }
  }
  for (const badSong of allSongs) {
    if (!allKnownSongs.includes(badSong)) {
      shrug(badSong);
    }
  }
}

export function ensureSong(ef: Effect) {
  if (haveEffect(ef) === 0) {
    openSongSlot(ef);
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw `Failed to get effect ${ef.name}`;
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureOde(turns: number) {
  while (haveEffect($effect`Ode to Booze`) < turns) {
    ensureMpTonic(50);
    openSongSlot($effect`Ode to Booze`);
    useSkill(1, $skill`The Ode to Booze`);
  }
}

export function kill() {
  return Macro.trySkill($skill`Curse of Weaksauce`)
    .trySkill($skill`Micrometeorite`)
    .tryItem($item`Time-Spinner`)
    .trySkill($skill`Sing Along`)
    .trySkill($skill`Stuffed Mortar Shell`)
    .trySkill($skill`Saucestorm`)
    .trySkillRepeat($skill`Saucegeyser`)
    .attack();
}

function checkFax(monster: Monster): boolean {
  cliExecute("fax receive");
  if (property.getString("photocopyMonster").toLowerCase() === monster.name.toLowerCase())
    return true;
  cliExecute("fax send");
  return false;
}

export function fax(monster: Monster): void {
  if (!get("_photocopyUsed")) {
    if (checkFax(monster)) return;
    chatPrivate("cheesefax", monster.name);
    for (let i = 0; i < 3; i++) {
      wait(5 + i);
      if (checkFax(monster)) return;
    }
    abort(`Failed to acquire photocopied ${monster.name}.`);
  }
}

export function mannyCleanup(): void {

  if (get("_claraBellUsed") === false && myAdventures() > 0) {
    use($item`Clara's bell`);
    setChoice(919, 1);
    do {
      adv1($location`Sloppy Seconds Diner`, -1, "");
    } while (get("lastEncounter") === "Nothing Could Be Finer");
  }

  if (get("boomBoxSong") !== "Food Vibrations") {
    cliExecute("boombox food");
  }

  if (get("_freeBeachWalksUsed") < 11) {
    cliExecute("combbeach free");
  }

  autosell($item`cheap sunglasses`, itemAmount($item`cheap sunglasses`) - 1);
  autosell($item`filthy child leash`, itemAmount($item`filthy child leash`));
  use(itemAmount($item`bag of park garbage`) - 30, $item`bag of park garbage`);
  use(itemAmount($item`Gathered Meat-Clip`), $item`Gathered Meat-Clip`);
  use(itemAmount($item`old coin purse`), $item`old coin purse`);
  use(itemAmount($item`old leather wallet`), $item`old leather wallet`);
  autosell($item`expensive camera`, itemAmount($item`expensive camera`));
  autosell($item`bag of gross foreign snacks`, itemAmount($item`bag of gross foreign snacks`));
  putShop(300, 0, itemAmount($item`gold nuggets`), $item`gold nuggets`);
  putShop(0, 0, itemAmount($item`cornucopia`), $item`cornucopia`);
  putShop(0, 0, itemAmount($item`elemental sugarcube`), $item`elemental sugarcube`);
  putShop(0, 0, itemAmount($item`gingerbread cigarette`), $item`gingerbread cigarette`);
  putShop(0, 0, itemAmount($item`abandoned candy`), $item`abandoned candy`);
  autosell($item`meat stack`, itemAmount($item`meat stack`));

  // check for a dggt if we haven't
  if (get("_defectiveTokenChecked") === false) {
    retrieveItem($item`Game Grid token`);
    visitUrl("place.php?whichplace=arcade&action=arcade_plumber");
  }
}

// shamelessly stolen from phccs
export function horse(horse: string): void {
  if (!horse.includes("horse")) horse = `${horse} horse`;
  if (get("_horsery") !== horse) cliExecute(`horsery ${horse}`);
}
