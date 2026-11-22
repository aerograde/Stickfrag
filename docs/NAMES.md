# Recovered name map

`readable/main.named.js` restores names for 36 subsystem classes. Names are inferred
from preserved fields and methods — the minifier did not leave the originals. The
transform is scope-aware and preserves the 126,617-line map of `readable/main.js`.

| minified | recovered | class line | refs | inferred role |
| --- | --- | ---: | ---: | --- |
| `xu` | `StickmanRenderer` | 97392 | 1 | stickman renderer |
| `Ya` | `Stickmen` | 98391 | 3 | stickman factory |
| `eb` | `Breakables` | 100629 | 1 | map effects / breakables |
| `$u` | `XpBar` | 101100 | 1 | XP bar HUD |
| `eh` | `Hud` | 101204 | 1 | HUD |
| `ih` | `Podium` | 102081 | 1 | podium scene |
| `ah` | `Predictor` | 102141 | 1 | local prediction |
| `yh` | `Pickups` | 104010 | 1 | pickups |
| `Qh` | `MapDrops` | 104144 | 1 | map drops |
| `As` | `ComicPass` | 104827 | 2 | comic post-process |
| `Tb` | `Effects` | 104967 | 1 | particle effects |
| `Ph` | `CardPacks` | 105084 | 1 | card packs |
| `Gh` | `CardsUI` | 105510 | 1 | card UI |
| `Yh` | `Rewards` | 106813 | 1 | rewards / XP / packs |
| `Kh` | `OwnerMenu` | 107067 | 1 | owner menu |
| `ds` | `Pacing` | 107440 | 2 | frame pacing / adaptive quality |
| `ef` | `BombMode` | 107826 | 1 | bomb mode |
| `nf` | `TouchInput` | 108373 | 1 | touch input |
| `af` | `Hardpoint` | 108684 | 1 | hardpoint mode |
| `lf` | `Sights` | 108829 | 1 | sights |
| `df` | `Game` | 108938 | 1 | game orchestrator |
| `uf` | `Diagnostics` | 109305 | 1 | frame diagnostics |
| `ff` | `Input` | 109474 | 1 | input |
| `Hm` | `InputBuffer` | 114899 | 1 | Colyseus input buffer |
| `_f` | `ServerClock` | 115149 | 1 | server clock |
| `Ym` | `Room` | 117265 | 1 | Colyseus room |
| `np` | `HttpApi` | 117690 | 1 | Colyseus HTTP |
| `Km` | `Auth` | 117826 | 1 | Colyseus auth |
| `ip` | `MultiplayerClient` | 117943 | 1 | Colyseus client |
| `ap` | `NetClient` | 118226 | 1 | network client |
| `Vm` | `Ambient` | 118799 | 2 | ambient |
| `Mp` | `MapProps` | 120380 | 1 | map props |
| `Pp` | `Glass` | 121094 | 1 | breakable glass |
| `Tp` | `Bottles` | 121359 | 1 | glass / bottles |
| `_p` | `Viewmodel` | 122255 | 1 | viewmodel |
| `ew` | `Renderer` | 125173 | 1 | renderer |

Renaming a top-level class changes `constructor.name` at runtime; no game behavior
depends on these names as far as the recovered source shows, and the built bundle was
run offline and compared against the original. `readable/main.js` remains the
fidelity reference with the original names.
