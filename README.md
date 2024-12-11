# multi-logger README

Very simple logging utility, used to handle logging variables and errors in multiple languages:
go, python, javascript, typescript, typescript react, php, dart, rust, elixir, mojo

## Features

Two actions are provided:

- MultiLogger - Log (multi-logger.log)
  Used to log the currently hovered word below, or the current selection
  For PHP, this uses `dd()` to dump and die with variable inspection

- MultiLogger - Error (multi-logger.error)
  Used to log the currently hovered word below, as an error, or the current selection
  For PHP, this uses `dd("ERROR", variable)` to dump with an error indicator
  For Go, it inserts:

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

---

- **Enjoy!**
