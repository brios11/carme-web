const deliveryFeeUsd = delivery ? 100 : 0;
const totalUsd = CARME.vehicle.dailyRateUsd * numDays + deliveryFeeUsd;
