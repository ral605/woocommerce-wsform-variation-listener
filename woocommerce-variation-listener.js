/**
 * WooCommerce Variation Listener for WS Form
 * ---------------------------------------------------
 * This script listens for WooCommerce variation changes
 * and updates specified WS Form fields with the selected variation ID.
 *
 * ✅ Automatically updates WS Form fields when a variation is selected.
 * ✅ Supports multiple form fields (customizable below).
 * ✅ Triggers a WS Form event to ensure updates are recognized.
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ WooCommerce Variation Listener Initialized...");

    // 🛠️ Customize this array to match your WS Form field names
    var variationFields = [
        "field_3088",  // Primary product variation field
        "field_3214"   // Additional WS Form field (optional)
    ];

    /**
     * Updates the specified WS Form fields with the selected variation ID.
     * @param {string|number} variationId - The selected variation ID (or empty string if reset)
     */
    function updateVariationFields(variationId) {
        variationFields.forEach(function (fieldName) {
            var variationField = document.querySelector(`input[name='${fieldName}']`);

            if (variationField) {
                variationField.value = variationId || ""; // Set to variation ID or clear field
                console.log(`🔄 WS Form Field Updated: ${fieldName} = ${variationId || "Cleared"}`);

                // 🔥 Ensure WS Form recognizes the field change
                jQuery(variationField).trigger("change");
            } else {
                console.warn(`⚠️ WS Form Field Not Found: ${fieldName}`);
            }
        });
    }

    // 🎯 Listen for variation selection
    jQuery(document).on("found_variation", "form.variations_form", function (event, variation) {
        if (variation && variation.variation_id) {
            console.log(`✅ Variation Selected: ${variation.variation_id}`);
            updateVariationFields(variation.variation_id);
        }
    });

    // 🔄 Listen for variation reset (when user clears selection)
    jQuery(document).on("reset_data", "form.variations_form", function () {
        console.log("🛑 Variation Cleared: Resetting WS Form fields...");
        updateVariationFields("");
    });
});