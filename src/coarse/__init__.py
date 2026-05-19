import os

os.environ.setdefault("LITELLM_LOCAL_MODEL_COST_MAP", "true")

__version__ = "1.4.1"

from coarse.pipeline import extract_and_structure, review_paper  # noqa: F401
