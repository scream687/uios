# 18_CLI: UIOS Command Line Interface Specification

## 1. Commands
The `@uios/cli` package provides command-line utilities:

```bash
# Compile a design spec to React code
uios compile --spec project.spec.json --target react --out ./src/components

# Audit existing project components against Critic Board rules
uios audit --dir ./src --repair

# List available registered skills
uios skills list
```
