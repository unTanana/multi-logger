# multi-logger README

Very simple logging utility, used to handle logging variables and errors in multiple languages (go, python, javascript, dart)

## Features

Two actions are provided:

- MultiLogger - Log (multi-logger.log)
  Used to log the currently hovered word below, or the current selection

- MultiLogger - Error (multi-logger.error)
  Used to log the currently hovered word below, as an error, or the current selection
  for go, it inserts

  ```go
    if err != nil {
        return nil, err
    }
  ```

## Requirements

None

## Extension Settings

None

## Known Issues

Unknown

## Release Notes

### 0.0.1

Initial release of "multi-logger"

### 0.0.2

- Use "" for log quotes
- Fix go logs

### 0.0.3

- Fix go logs not just for errors

### 0.0.4

- use fmt.Printf in go logs
- update dart logs

### 0.0.5

- update go logging

---

- **Enjoy!**
