// Create a script that you can place in chrome console to convert newegg.com to checkout.js v4



// PART 1: Create script tag
    // Use google to figure out how to create a script tag
        // Source should be "//www.paypalobjects.com/api/checkout.js"
        // Set the onload property to the paypalCheckoutReady function
        // Append the script to the document head.



// END PART 1

// PART 2: Remove the old paypal button
    // Go to newegg.coms cart page and click the paypal button
        // Copy the EC token from the URL and place it in a variable named paypalToken
    // Inspect the current button
    // Target the button and place it in a variable called oldButton
        // use innerHTML to remove the current contents


// END PART 2



var paypalSetup = false;
function paypalCheckoutReady() {
    if (!paypalSetup) {
        paypalSetup = true;

        // PART 3: Render the Button Component
            // Set environment to production
            // Create onCancel callback that redirects
            // Create onError callback that console.logs the error
            // Create payment callback that returns the paypalToken from above
            // Create onAuthorize callback that redirects
            // Style the button with the blue color
            // Pass the oldButton variable as the DOM id

        
        
        
        // END PART 3
        
    }
}
