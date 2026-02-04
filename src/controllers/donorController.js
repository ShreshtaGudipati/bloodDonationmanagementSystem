import Donor from '../models/Donor.js';
import { calculateDistance } from '../utils/geolocation.js';

// Search donors with filters
export const searchDonors = async (req, res) => {
  try {
    const {
      bloodGroup,
      maxDistance,
      onlyAvailable,
      userLat,
      userLng,
      sortBy = 'distance'
    } = req.query;

    // Build the query
    let query = {};

    // Filter by blood group if provided
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    // Filter by availability if requested
    if (onlyAvailable === 'true') {
      query.available = true;
    }

    // Add location-based query if coordinates are provided
    if (userLat && userLng) {
      const maxDistanceInMeters = maxDistance ? maxDistance * 1609.34 : 16093.4; // Convert miles to meters
      
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(userLng), parseFloat(userLat)]
          },
          $maxDistance: maxDistanceInMeters
        }
      };
    }

    // Execute the query
    let donors = await Donor.find(query);

    // Calculate distances and add to results
    if (userLat && userLng) {
      donors = donors.map(donor => {
        const distance = calculateDistance(
          parseFloat(userLat),
          parseFloat(userLng),
          donor.location.coordinates[1],
          donor.location.coordinates[0]
        );
        return {
          ...donor.toObject(),
          distance: (distance / 1609.34).toFixed(1) // Convert meters to miles
        };
      });
    }

    // Sort results
    switch (sortBy) {
      case 'distance':
        donors.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'donationCount':
        donors.sort((a, b) => b.donationCount - a.donationCount);
        break;
      case 'lastDonation':
        donors.sort((a, b) => new Date(b.lastDonation) - new Date(a.lastDonation));
        break;
    }

    res.status(200).json({
      success: true,
      count: donors.length,
      data: donors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get donor by ID
export const getDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    
    if (!donor) {
      return res.status(404).json({
        success: false,
        error: 'Donor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update donor availability
export const updateAvailability = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    
    if (!donor) {
      return res.status(404).json({
        success: false,
        error: 'Donor not found'
      });
    }

    donor.available = req.body.available;
    await donor.save();

    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 