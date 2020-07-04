#!node

const curseforge = require("mc-curseforge-api");
const writeModList = require('./src/utils/writeModList');

const modList = [
    { searchQuery: 'adabranium', key: 'adabranium', filename: 'adabranium.jar' },
    { searchQuery: 'adorn', key: 'adorn', filename: 'adorn.jar' },
    { searchQuery: 'autofish', key: 'autofish', filename: 'autofish.jar' },
    { searchQuery: 'beem', key: 'beem', filename: 'beem.jar' },
    { searchQuery: 'blockus', key: 'blockus', filename: 'blockus.jar' },
    { searchQuery: 'bounding-box-outline-reloaded', key: 'bounding-box-outline-reloaded', filename: 'bounding-box-outline-reloaded.jar' },
    { searchQuery: 'bulky-shulkies', key: 'bulky-shulkies', filename: 'bulky-shulkies.jar' },
    { searchQuery: 'bunch-o-trinkets', key: 'bunch-o-trinkets', filename: 'bunch-o-trinkets.jar' },
    { searchQuery: 'compost-recipes', key: 'compost-recipes', filename: 'compost-recipes.jar' },
    { searchQuery: 'convenient-things', key: 'convenient-things', filename: 'convenient-things.jar' },
    { searchQuery: 'craftingpad-fabric', key: 'craftingpad-fabric', filename: 'craftingpad-fabric.jar' },
    { searchQuery: 'customskinloader', key: 'customskinloader', filename: 'customskinloader.jar' },
    { searchQuery: 'data-loader', key: 'data-loader', filename: 'data-loader.jar' },
    { searchQuery: 'demeter', key: 'demeter', filename: 'demeter.jar' },
    { searchQuery: 'diggus-maximus', key: 'diggus-maximus', filename: 'diggus-maximus.jar' },
    { searchQuery: 'ding', key: 'ding', filename: 'ding.jar' },
    { searchQuery: 'dynamic-fps', key: 'dynamic-fps', filename: 'dynamic-fps.jar' },
    { searchQuery: 'easierchests', key: 'easierchests', filename: 'easierchests.jar' },
    { searchQuery: 'easiercrafting', key: 'easiercrafting', filename: 'easiercrafting.jar' },
    { searchQuery: 'egg tab', key: 'eggtab', filename: 'eggtab.jar' },
    { searchQuery: 'elytra-swap', key: 'elytra-swap', filename: 'elytra-swap.jar' },
    { searchQuery: 'enchanted-tooltips', key: 'enchanted-tooltips', filename: 'enchanted-tooltips.jar' },
    { searchQuery: 'endfestation', key: 'endfestation', filename: 'endfestation.jar' },
    { searchQuery: 'exotic-blocks', key: 'exotic-blocks', filename: 'exotic-blocks.jar' },
    { searchQuery: 'expanded-storage-fabric', key: 'expanded-storage-fabric', filename: 'expanded-storage-fabric.jar' },
    { searchQuery: 'extra-bows', key: 'extra-bows', filename: 'extra-bows.jar' },
    { searchQuery: 'fabric-api', key: 'fabric-api', filename: 'fabric-api.jar' },
    { searchQuery: 'fabric-language-kotlin', key: 'fabric-language-kotlin', filename: 'fabric-language-kotlin.jar' },
    { searchQuery: 'fairenchanting', key: 'fairenchanting', filename: 'fairenchanting.jar' },
    { searchQuery: 'flonters', key: 'flonters', filename: 'flonters.jar' },
    { searchQuery: 'flora-doubling', key: 'flora-doubling', filename: 'flora-doubling.jar' },
    { searchQuery: 'giselbaers-durability-viewer', key: 'giselbaers-durability-viewer', filename: 'giselbaers-durability-viewer.jar' },
    { searchQuery: 'glowing-beds', key: 'glowing-beds', filename: 'glowing-beds.jar' },
    { searchQuery: 'go-down', key: 'go-down', filename: 'go-down.jar' },
    { searchQuery: 'health-overlay-fabric', key: 'health-overlay-fabric', filename: 'health-overlay-fabric.jar' },
    { searchQuery: 'held-item-info', key: 'held-item-info', filename: 'held-item-info.jar' },
    { searchQuery: 'horse stats vanilla', key: 'horsestatsvanilla', filename: 'horsestatsvanilla.jar' },
    { searchQuery: 'hwyla', key: 'hwyla', filename: 'hwyla.jar' },
    { searchQuery: 'illuminations', key: 'illuminations', filename: 'illuminations.jar' },
    { searchQuery: 'improved-stations', key: 'improved-stations', filename: 'improved-stations.jar' },
    { searchQuery: 'infinity-fix', key: 'infinity-fix', filename: 'infinity-fix.jar' },
    { searchQuery: 'inventory-sorting', key: 'inventory-sorting', filename: 'inventory-sorting.jar' },
    { searchQuery: 'irish-wolves', key: 'irish-wolves', filename: 'irish-wolves.jar' },
    { searchQuery: 'item-scroller', key: 'item-scroller', filename: 'item-scroller.jar' },
    { searchQuery: 'libcd', key: 'libcd', filename: 'libcd.jar' },
    { searchQuery: 'light-overlay', key: 'light-overlay', filename: 'light-overlay.jar' },
    { searchQuery: 'linked-storage', key: 'linked-storage', filename: 'linked-storage.jar' },
    { searchQuery: 'lithium', key: 'lithium', filename: 'lithium.jar' },
    { searchQuery: 'llama-steeds', key: 'llama-steeds', filename: 'llama-steeds.jar' },
    { searchQuery: 'malilib', key: 'malilib', filename: 'malilib.jar' },
    { searchQuery: 'mambience', key: 'mambience', filename: 'mambience.jar' },
    { searchQuery: 'minihud', key: 'minihud', filename: 'minihud.jar' },
    { searchQuery: 'missingbits', key: 'missingbits', filename: 'missingbits.jar' },
    { searchQuery: 'mob-ropes', key: 'mob-ropes', filename: 'mob-ropes.jar' },
    { searchQuery: 'mod menu', key: 'modmenu', filename: 'modmenu.jar' },
    { searchQuery: 'more-berries', key: 'more-berries', filename: 'more-berries.jar' },
    { searchQuery: 'mouse-wheelie', key: 'mouse-wheelie', filename: 'mouse-wheelie.jar' },
    { searchQuery: 'nomad books', key: 'nomadbooks', filename: 'nomadbooks.jar' },
    { searchQuery: 'not-enough-crashes', key: 'not-enough-crashes', filename: 'not-enough-crashes.jar' },
    { searchQuery: 'orderly', key: 'orderly', filename: 'orderly.jar' },
    { searchQuery: 'phosphor', key: 'phosphor', filename: 'phosphor.jar' },
    { searchQuery: 'quick-shulker', key: 'quick-shulker', filename: 'quick-shulker.jar' },
    { searchQuery: 'ring-of-the-enderchest-fabric', key: 'ring-of-the-enderchest-fabric', filename: 'ring-of-the-enderchest-fabric.jar' },
    { searchQuery: 'roughly-enough-items', key: 'roughly-enough-items', filename: 'roughly-enough-items.jar' },
    { searchQuery: 'roughly-enough-resources', key: 'roughly-enough-resources', filename: 'roughly-enough-resources.jar' },
    { searchQuery: 'shest-fabric', key: 'shest-fabric', filename: 'shest-fabric.jar' },
    { searchQuery: 'shulker-charm', key: 'shulker-charm', filename: 'shulker-charm.jar' },
    { searchQuery: 'shulkerboxtooltip', key: 'shulkerboxtooltip', filename: 'shulkerboxtooltip.jar' },
    { searchQuery: 'simple-teleporters-fabric', key: 'simple-teleporters-fabric', filename: 'simple-teleporters-fabric.jar' },
    { searchQuery: 'slotlink', key: 'slotlink', filename: 'slotlink.jar' },
    { searchQuery: 'smooth-scrolling-everywhere-fabric', key: 'smooth-scrolling-everywhere-fabric', filename: 'smooth-scrolling-everywhere-fabric.jar' },
    { searchQuery: 'sneak through berries', key: 'sneakthroughberries', filename: 'sneakthroughberries.jar' },
    { searchQuery: 'soulbound-fabric', key: 'soulbound-fabric', filename: 'soulbound-fabric.jar' },
    { searchQuery: 'strong-and-fair-anvils', key: 'strong-and-fair-anvils', filename: 'strong-and-fair-anvils.jar' },
    { searchQuery: 'superaxes', key: 'superaxes', filename: 'superaxes.jar' },
    { searchQuery: 'terrestria', key: 'terrestria', filename: 'terrestria.jar' },
    { searchQuery: 'torcherino', key: 'torcherino', filename: 'torcherino.jar' },
    { searchQuery: 'trade', key: 'trade', filename: 'trade.jar' },
    { searchQuery: 'traverse', key: 'traverse', filename: 'traverse.jar' },
    { searchQuery: 'trinkets-fabric', key: 'trinkets-fabric', filename: 'trinkets-fabric.jar' },
    { searchQuery: 'tweakeroo', key: 'tweakeroo', filename: 'tweakeroo.jar' },
    { searchQuery: 'vanilla-hammers', key: 'vanilla-hammers', filename: 'vanilla-hammers.jar' },
    { searchQuery: 'voxelmap', key: 'voxelmap', filename: 'voxelmap.jar' },
    { searchQuery: 'wrench-anything', key: 'wrench-anything', filename: 'wrench-anything.jar' },
    { searchQuery: 'yet another gravestone mod', key: 'yet-another-gravestone-mod', filename: 'yet-another-gravestone-mod.jar' },
    { searchQuery: 'ynet', key: 'ynet', filename: 'ynet.jar' },
]

async function main() {
    let modListData = {}
    let notFoundList = []
    let foundList = []

    let fileToDownload = []

    for (const index in modList) {
        const { searchQuery, key } = modList[index];
        const mods = await curseforge.getMods({
            searchFilter: searchQuery,
        });
        let found = false;
        for (const mod of mods) {
            if (mod.key == key) {
                found = true;
                modList[index].mod = mod;
                break;
            }
        }
        if (found) {
            foundList.push(key)
        }
        else
            notFoundList.push(key)
        console.log(`${(Number(index) + 1)}/${modList.length}`, key, `Found:`, found)

        const { mod } = modList[index];

        const files = (await mod.getFiles()).sort((a, b) => {
            const left = new Date(b.timestamp);
            const right = new Date(a.timestamp);

            if (left < right) {
                return -1;
            }
            if (left > right) {
                return 1;
            }

            return 0;
        })

        let hasmc116 = false;
        const addToDownloadList = (f) => {
            hasmc116 = true;
            fileToDownload.push(f)
            modList[index].file = f
            console.log(`Download URL: \`${f.download_url}\``)
        }


        for (const file of files) {
            if (file.minecraft_versions.length == 0) {
                addToDownloadList(file)
                break;
            }
            else if (file.minecraft_versions.includes("1.16.1") && !file.download_url.includes("forge") && !file.minecraft_versions.includes("Forge")) {
                addToDownloadList(file)
                break;
            }
            else if (file.minecraft_versions.includes("1.16") && !file.download_url.includes("forge") && !file.minecraft_versions.includes("Forge")) {
                addToDownloadList(file)
                break;
            }
            else if (file.minecraft_versions.includes("1.16-Snapshot") && !file.minecraft_versions.includes("Forge")) {
                addToDownloadList(file)
                break;
            }
            else if (file.minecraft_versions.includes("Fabric") && file.minecraft_versions.length == 1) {
                addToDownloadList(file)
                break;
            } else if (file.download_url.includes("1.16.1") && !file.download_url.includes("forge") && !file.minecraft_versions.includes("Forge")) {
                addToDownloadList(file)
                break;
            } else if (file.download_url.includes("1.16") && !file.download_url.includes("forge") && !file.minecraft_versions.includes("Forge")) {
                addToDownloadList(file)
                break;
            }
        }
        if (hasmc116) {
            modList[index].name = modList[index].mod.name
            modList[index].mod_id = modList[index].mod.id
            modList[index].url = modList[index].mod.url
            modList[index].file_id = modList[index].file.id
            modList[index].download = modList[index].file.download_url
            modList[index].enable = true
            delete modList[index].mod;
            delete modList[index].file;
            const dkey = modList[index].key
            const temp = JSON.parse(JSON.stringify(modList[index]));
            delete temp.key
            modListData[dkey] = temp
        } else {
            console.log(`Warning: \`${key}\` don't have 1.16 mod!!!`)
        }

        // break;
    }
    writeModList(modListData)

}

main()
