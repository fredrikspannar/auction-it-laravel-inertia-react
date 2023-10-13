<?php 

// Global helpers that is loaded in composer.json
// do not forget to run composer dump-autoload

if ( !function_exists('array_flatten') ) {
    function array_flatten(array $array)
    {
        $flat = array(); // initialize return array
        $stack = array_values($array); // initialize stack
        while($stack) // process stack until done
        {
            $value = array_shift($stack);
            if (is_array($value)) // a value to further process
            {
                array_unshift($stack, ...$value);
            }
            else // a value to take
            {
                $flat[] = $value;
            }
        }
        return $flat;
    }
}
