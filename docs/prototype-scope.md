# Hangout Room first prototype scope

This repository starts with a lightweight WebXR prototype so the social space can be tested quickly on desktop browsers, Quest Browser, PCVR browser runtimes, and future OpenXR/WebXR-capable headsets.

## First playable goals

- Let a player enter a stylized cafeteria commons scene.
- Provide simple VR/desktop interaction targets for early playtesting.
- Represent the long-term social loop: shared cafeteria, private dorm, and playful objects.
- Keep assets intentionally simple so the prototype remains friendly to standalone headset performance.

## Implemented in this slice

- Landing page with project framing and AGPL source/license link.
- Embedded A-Frame/WebXR scene with VR mode enabled.
- Cafeteria shell with tables, benches, signage, and placeholder avatar stand-ins.
- Dorm portal that toggles the player between the cafeteria commons and a private dorm vignette.
- Basketball launcher aimed toward a hoop.
- Frisbee launcher and capped confetti toy launcher.
- Reset control to clear spawned toys.

## Near-term next steps

1. Add real controller grab/throw interactions instead of click-to-launch shortcuts.
2. Add multiplayer avatar replication for head and hands.
3. Replace placeholder geometry with optimized original stylized models.
4. Add room instance data for player dorms and user-created spaces.
5. Add comfort settings for snap turn, teleport locomotion, seated mode, and personal space.

## Platform notes

- **Quest**: target Quest Browser/WebXR for fast iteration, then evaluate native Unity/OpenXR if the prototype needs store distribution.
- **PCVR**: test through WebXR-capable browsers and SteamVR runtimes where available.
- **Steam Frame**: keep controls and rendering portable through OpenXR/WebXR assumptions, with simple materials and conservative draw calls for standalone-class hardware.
