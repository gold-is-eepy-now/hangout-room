# Hangout Room

A first playable WebXR prototype for a social VR hangout space inspired by the idea of dorm rooms, user-created social spaces, and a primary cafeteria-style commons with playful activities.

## Prototype features

- Stylized cafeteria commons scene.
- Private dorm-room portal vignette.
- Basketball hoop with click/trigger-to-shoot prototype ball.
- Frisbee and confetti toy launchers.
- Desktop mouse controls plus WebXR/VR entry through A-Frame.

## Run locally

```bash
npm start
```

Then open <http://localhost:8080>.

## Test

```bash
npm test
```

The test checks JavaScript syntax and validates that the static prototype files contain the expected WebXR scene hooks.

## Target platforms

The prototype is intentionally lightweight so it can be evaluated in Quest Browser, PCVR browser runtimes, and future standalone/OpenXR-oriented devices such as Steam Frame. A later production build may move to a native engine, but this WebXR slice is meant for fast iteration on interaction design and social-space layout.

## License

AGPL-3.0-or-later. See [LICENSE](./LICENSE).
