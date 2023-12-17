// Import necessary modules and configurations
import supabase, { supabaseUrl } from './supabase';

// Function to get a list of cabins from the Supabase database
export async function getCabins() {
  // Fetch cabins data from the 'cabins' table
  const { data, error } = await supabase.from('cabins').select('*');

  // Handle any errors during the fetch operation
  if (error) {
    console.error(error);
    throw new Error('cabins could not be loaded');
  }

  // Return the fetched data
  return data;
}

// Function to delete a cabin and its associated image
export async function deleteCabin(cabinId, image) {
  // Delete the cabin from the 'cabins' table
  const { error } = await supabase.from('cabins').delete().eq('id', cabinId);

  // Handle any errors during the deletion operation
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  // Delete the associated image from the storage
  await deleteCabinImage(image);

  // Return null as the deletion was successful
  return null;
}

// Function to create or edit a cabin, including handling associated image uploads/deletions
export async function createEditCabin(cabin, editedCabinId, previousImagePath) {
  // Check if the cabin has an uploaded image
  const hasUploadedImage = typeof cabin.image === 'string';
  let imagePath;

  // If editing an existing cabin
  if (editedCabinId) {
    // Use the new image path if an image is uploaded; otherwise, delete the previous image and upload the new one
    imagePath = hasUploadedImage
      ? cabin.image
      : await deleteAndUploadCabinImage(cabin, previousImagePath);
  } else {
    imagePath = !hasUploadedImage
      ? await uploadCabinImage(cabin.image)
      : cabin.image;
  }

  // Determine whether to create or edit the cabin based on the presence of an editedCabinId
  return editedCabinId
    ? await editCabin(cabin, editedCabinId, imagePath)
    : await createCabin(cabin, imagePath);
}

// Function to delete a cabin image from storage
async function deleteCabinImage(imagePath) {
  // Extract the image name from the path
  const imageName = imagePath.split('/').pop();

  // Delete the image from storage
  const { error } = await supabase.storage
    .from('cabin-images')
    .remove([imageName]);

  // Handle any errors during the deletion operation
  if (error) {
    console.error(error);
    throw new Error('Cabin image could not be deleted');
  }
}

// Function to upload a cabin image to storage
async function uploadCabinImage(image) {
  const hasUploadedBefore = typeof image === 'string';

  if (hasUploadedBefore) {
    console.log(image);
    const { data, error } = await supabase.storage
      .from('cabin-images')
      .copy(
        `${image.split('/').pop()}`,
        `${Math.random()}-${image.split('/').pop()}`
      );

    // Handle any errors during the upload operation
    if (error) {
      console.error(error);
      throw new Error('Cabin image could not be uploaded');
    }

    return `${supabaseUrl}/storage/v1/object/public/${data.path}`;
  } else {
    // Generate a random image name to prevent conflicts
    const imageName = `${Math.random()}-${image.name.replaceAll('/', '')}`;

    // Construct the full image path in storage
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Upload the image to storage with specified options
    const { error } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, image, {
        cacheControl: '3600',
        upsert: false,
      });

    // Handle any errors during the upload operation
    if (error) {
      console.error(error);
      throw new Error('Cabin image could not be uploaded');
    }

    // Return the constructed image path
    return imagePath;
  }
}

// Function to delete the previous image and upload a new one when editing a cabin
async function deleteAndUploadCabinImage(cabin, previousImagePath) {
  // Delete the previous image
  await deleteCabinImage(previousImagePath);

  // Upload the new image
  return uploadCabinImage(cabin.image);
}

// Function to create a new cabin in the 'cabins' table
async function createCabin(cabin, imagePath) {
  // Insert the new cabin data into the 'cabins' table with the associated image path
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabin, image: imagePath }]);

  // Handle any errors during the insertion operation
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // Return the created cabin data
  return data;
}

// Function to edit an existing cabin in the 'cabins' table
async function editCabin(cabin, editedCabinId, imagePath) {
  // Update the existing cabin data in the 'cabins' table with the new image path
  const { data, error } = await supabase
    .from('cabins')
    .update({ ...cabin, image: imagePath })
    .eq('id', editedCabinId)
    .select()
    .single();

  // Handle any errors during the update operation
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be edited');
  }

  // Return the updated cabin data
  return data;
}

// Function to duplicate a cabin based on a previous cabin including the image upload
export async function duplicateCabin(previousCabin) {
  // Check if the previous cabin has an image to upload
  const hasUploadedImage = typeof previousCabin.image === 'string';

  // Upload the previous cabin image to storage if it exists
  const newImagePath = hasUploadedImage
    ? await uploadCabinImage(previousCabin.image)
    : null;

  // Insert a new entry into the 'cabins' table with the data of the previous cabin
  const { data, error } = await supabase.from('cabins').insert([
    {
      image: newImagePath,
      name: `Copy of ${previousCabin.name}`,
      description: previousCabin.description,
      regularPrice: previousCabin.regularPrice,
      maxCapacity: previousCabin.maxCapacity,
      discount: previousCabin.discount,
    },
  ]);

  // Handle any errors during the insertion operation
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be duplicated');
  }

  // Return the duplicated cabin data
  return data;
}
