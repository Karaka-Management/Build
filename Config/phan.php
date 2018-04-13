<?php
return [
    'backward_compatibility_checks' => false,
    'quick_mode' => false,
    'analyze_signature_compatibility' => true,
    'minimum_severity' => 0,
    'allow_missing_properties' => false,
    'null_casts_as_any_type' => false,
    'null_casts_as_array' => false,
    'array_casts_as_null' => false,
    'scalar_implicit_cast' => false,
    'scalar_implicit_partial' => [],
    'ignore_undeclared_variables_in_global_scope' => false,
    'suppress_issue_types' => [
        // 'PhanUndeclaredMethod',
    ],
    'whitelist_issue_types' => [
        // 'PhanAccessMethodPrivate',
    ],
];
