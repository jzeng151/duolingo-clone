#!/usr/bin/env python3
"""
Regenerate public/lottie/hero-mascot.json — the hero character-group Lottie with
Duo the owl's artwork replaced by our mascot (public/assets/mascot_excited.svg).

The mascot is embedded as an image layer inside comp_6 (Duo's composition),
driven by Duo's original body ("bod") transform, so it tumbles out of the phone,
spins upright and idle-bobs exactly the way Duo did, in sync with the rest of the
cast. Source rig: public/lottie/50bda50231c0bce1584e982cebfe8f33.json.

Run from the repo root:
    python3 scripts/build_hero_mascot.py [F] [OFFX] [OFFY] [FLIP] [ROT]

Args (all optional, current production values shown):
    F     mascot scale, percent of native size              (36)
    OFFX  x nudge in comp units, + = right                  (0)
    OFFY  y nudge in comp units, + = down                   (-10)
    FLIP  1 = mirror-correct the group's horizontal flip    (1)
    ROT   on-phone start tilt in degrees, + = lean left     (55)

The hero playback (intro once, then seamless idle loop of frames [124, 204]) lives
in app/components/Lottie.tsx + HeroAnimation.tsx, not here.
"""
import json, base64, sys, copy

F    = float(sys.argv[1]) if len(sys.argv) > 1 else 36.0
OFFX = float(sys.argv[2]) if len(sys.argv) > 2 else 0.0
OFFY = float(sys.argv[3]) if len(sys.argv) > 3 else -10.0
FLIP = int(sys.argv[4])   if len(sys.argv) > 4 else 1
ROT  = float(sys.argv[5]) if len(sys.argv) > 5 else 55.0

src = 'public/lottie/50bda50231c0bce1584e982cebfe8f33.json'
d = json.load(open(src))
comps = {a['id']: a for a in d.get('assets', []) if 'layers' in a}
c6 = comps['comp_6']
bod = copy.deepcopy([l for l in c6['layers'] if l.get('nm') == 'bod'][0])

svg = open('public/assets/mascot_excited.svg', 'rb').read()
b64 = base64.b64encode(svg).decode()
W = 1254; H = 1254
d.setdefault('assets', []).append(
    {"id": "mascotImg", "w": W, "h": H, "u": "", "p": "data:image/svg+xml;base64," + b64, "e": 1})


def scaled_s(ks):
    out = copy.deepcopy(ks)
    fx = -(F) if FLIP else F
    for kf in out['k']:
        kf['s'] = [kf['s'][0] / 100.0 * fx, kf['s'][1] / 100.0 * F, 100]
    return out


def offset_p(ks):
    out = copy.deepcopy(ks)
    for kf in out['k']:
        kf['s'] = [kf['s'][0] + OFFX, kf['s'][1] + OFFY, 0]
    return out


# Custom rotation: parallel-to-phone during on-phone phase (0-46), upright by landing (70),
# then keep the small idle wobble. Negative-x flip negates visual rotation, so layer = -visual.
layerR = -ROT if FLIP else ROT
ease_i = {"x": [0.6], "y": [1]}; ease_o = {"x": [0.4], "y": [0]}
r_k = [
    {"t": 0,   "s": [layerR], "i": ease_i, "o": ease_o},
    {"t": 46,  "s": [layerR], "i": ease_i, "o": ease_o},
    {"t": 70,  "s": [0],      "i": ease_i, "o": ease_o},
    {"t": 120, "s": [3 if FLIP else -3], "i": ease_i, "o": ease_o},
    {"t": 150, "s": [0],      "i": ease_i, "o": ease_o},
    {"t": 200, "s": [3 if FLIP else -3], "i": ease_i, "o": ease_o},
    {"t": 235, "s": [0]},
]
r_ks = {"a": 1, "k": r_k}

img_layer = {
    "ddd": 0, "ind": 1, "ty": 2, "nm": "mascot", "refId": "mascotImg", "sr": 1,
    "ks": {"o": {"a": 0, "k": 100}, "r": r_ks, "p": offset_p(bod['ks']['p']),
           "a": {"a": 0, "k": [W / 2.0, H / 2.0, 0]}, "s": scaled_s(bod['ks']['s'])},
    "ao": 0, "ip": c6.get('ip', 0), "op": c6.get('op', 290), "st": 0, "bm": 0
}
c6['layers'] = [img_layer]
json.dump(d, open('public/lottie/hero-mascot.json', 'w'), separators=(',', ':'))
print(f"built F={F} OFFX={OFFX} OFFY={OFFY} FLIP={FLIP} ROT={ROT}")
