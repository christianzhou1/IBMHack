$sb = New-Object System.Text.StringBuilder

Function Get-Tree {
    Param (
        [String]$Path,        # The root path to start the tree structure
        [Int]$LevelMax,       # The maximum depth of the tree
        [Int]$Level = 0,      # Current depth level (starts at 0)
        [Bool]$LastOfTheList = $true,  # Determines if it's the last item in the list for formatting
        [String]$Lead = ""    # Used for building the indentation and tree structure
    )

    # Append the root path at the start
    if ($Level -eq 0) {
        $sb.AppendLine($Path)
    }

    # Stop if we reach the maximum level
    if ($Level -eq $LevelMax) { 
        Return
    }

    # Determine how to format the indentation for the current level
    $Lead = if($LastOfTheList){"$Lead   "}else{"$Lead$([char]0x2502)  "}

    # Get directories and files from the current path
    [Array]$Liste = Get-ChildItem -Path $Path

    # Loop through the items in the directory
    For($x = 0; $x -lt $Liste.Count; $x++) {
        $item = $Liste[$x]
        
        # Check if it is the last item in the list
        if ($x -eq $Liste.Count - 1) { 
            # Append the last item with a specific tree character
            if ($item.PSIsContainer) {
                # For directories
                $sb.AppendLine("$($Lead)$([char]0x2514)$([char]0x2500)$([char]0x2500)$($item.Name)") | Out-Null 
                Get-Tree -Path $item.Fullname -LevelMax $LevelMax -Level ($Level + 1) -Lead $Lead -LastOfTheList $true
            } else {
                # For files
                $sb.AppendLine("$($Lead)$([char]0x2514)$([char]0x2500)$([char]0x2500)$($item.Name)") | Out-Null 
            }
        }
        else {
            # For directories or files
            if ($item.PSIsContainer) {
                # For directories
                $sb.AppendLine("$($Lead)$([char]0x251c)$([char]0x2500)$([char]0x2500)$($item.Name)") | Out-Null
                Get-Tree -Path $item.Fullname -LevelMax $LevelMax -Level ($Level + 1) -Lead $Lead -LastOfTheList $false
            } else {
                # For files
                $sb.AppendLine("$($Lead)$([char]0x251c)$([char]0x2500)$([char]0x2500)$($item.Name)") | Out-Null
            }
        }
    }
}


Get-Tree -Path ".\" -LevelMax 6
$sb.ToString() | Out-File "GetTree.txt" -Encoding UTF8