from pathlib import Path
from typing import Final

ROOT_DIR: Final[Path] = Path(__file__).parents[4]
MODAK_DIR: Final[Path] = Path(__file__).parents[1]

ENVS: Final[Path] = MODAK_DIR / "envs"
DOCS: Final[Path] = MODAK_DIR / "docs"
