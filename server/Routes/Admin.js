import express from "express";

import {Order, customerOrders, Util} from "../Models/Models.js";

const admin = express.Router();

admin.get("/api/orders/migrate", async (req, res) => {
  const emailsToIgnore = [
    "chinadelightmd@gmail.com",
    "willzhang21@icloud.com",
    "chinadelightnoreply@gmail.com",
    "zhanliam21@gmail.com",
  ];
  var totalOrdersLookedAt = 0;
  var orderNumber = 0;
  await Order.find({}, {__v: 0}, (err, docs) => {
    if (!err) {
      try {
        docs.map((order) => {
          totalOrdersLookedAt++;

          if (emailsToIgnore.includes(order.email)) {
            console.log("ignoring email: ", order.email);
            return;
          }
          orderNumber++;
          const day = order.timePlaced.split(" ")[0];
          const month = order.timePlaced.split(" ")[1];
          const year = order.timePlaced.split(" ")[3];
          const time = order.timePlaced.split(" ")[4];
          const hour = "h" + time.split(":")[0];
          console.log(
            `Adding Order ${orderNumber} placed on ${day} ${month} ${year} at ${time} to the database`
          );

          customerOrders
            .create({
              name: order.name,
              email: order.email,
              phone: order.phone,
              pickUpOption: order.pickUpOption,
              pickUpTime: order.pickUpTime,
              cart: order.cart,
              orderReqs: order.orderReqs,
              total: order.total,
              timePlaced: order.timePlaced,
              estimatedTime: order.estimatedTime,
              paymentMethod: order.paymentMethod,
              deviceType: "desktop",
              orderNumber: orderNumber,
              day: day,
              month: month,
              year: year,
              hour: hour,
            })
            .catch((err) => {
              console.log(`Throwing error for ${orderNumber}`);
              throw new Exception(`Failed to add ${orderNumber} with ${err}`);
            });
        });
      } catch (e) {
        console.log(`Failed to add ${orderNumber} with ${e}`);
      }
    } else {
      console.log(`Sending error back on ${totalOrdersLookedAt}`);
      res.status(400).json({error: err});
    }
  });
  res
    .status(200)
    .send(`Looked at ${totalOrdersLookedAt} orders and added ${orderNumber}.`);
});

admin.get("/api/stats", async (req, res) => {
  try {
    const data = await Util.find({name: "Stats"}, {__v: 0});
    res.status(200).json(data[0].utilData);
  } catch (e) {
    res.status(400).json({error: e});
  }
});

admin.get("/api/orders/count", async (_, res) => {
  await customerOrders.find({}, {__v: 0}, (err, docs) => {
    if (!err) {
      res.json(docs[830]);
    } else {
      res.status(400).json({error: err});
    }
  });
});

admin.get("/api/orders/stats/count", async (_, res) => {
  const defaultMonths = () => {
    return {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };
  };
  const defaultDays = () => {
    return {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };
  };
  const defaultHours = () => {
    return {
      h01: 0,
      h09: 0,
      h10: 0,
      h11: 0,
      h12: 0,
      h13: 0,
      h14: 0,
      h15: 0,
      h16: 0,
      h17: 0,
      h18: 0,
      h19: 0,
      h20: 0,
      h21: 0,
      h22: 0,
      h23: 0,
    };
  };
  const defaultYear = () => {
    const stats = {total: 0};
    stats.months = defaultMonths();
    stats.days = defaultDays();
    stats.hours = defaultHours();
    return stats;
  };
  const baseStats = () => {
    const stats = {
      all: 0,
    };
    stats.y2021 = defaultYear();
    stats.y2022 = defaultYear();
    stats.y2023 = defaultYear();
    return stats;
  };

  var stats = {};
  stats.count = baseStats();
  stats.revenue = baseStats();
  stats.averageOrderTotal = baseStats();
  stats.mobileUsers = baseStats();
  stats.desktopUsers = baseStats();

  const updateCount = (order) => {
    stats.count.all++;
    stats.count[`y${order.year}`].total++;
    stats.count[`y${order.year}`].months[order.month]++;
    stats.count[`y${order.year}`].days[order.day]++;
    stats.count[`y${order.year}`].hours[order.hour]++;
  };
  const updateRevenue = (order) => {
    stats.revenue.all += order.total;
    stats.revenue[`y${order.year}`].total += order.total;
    stats.revenue[`y${order.year}`].months[order.month] += order.total;
    stats.revenue[`y${order.year}`].days[order.day] += order.total;
    stats.revenue[`y${order.year}`].hours[order.hour] += order.total;
  };

  const updateAverageOrderTotal = () => {
    stats.averageOrderTotal.all = stats.revenue.all / stats.count.all;
    stats.averageOrderTotal.y2021.total =
      stats.revenue.y2021.total / stats.count.y2021.total;
    stats.averageOrderTotal.y2022.total =
      stats.revenue.y2022.total / stats.count.y2022.total;
    stats.averageOrderTotal.y2023.total =
      stats.revenue.y2023.total / stats.count.y2023.total;
  };

  const updateMobileUsers = (order) => {
    if (order.deviceType === "mobile") {
      stats.mobileUsers.all++;
      stats.mobileUsers[`y${order.year}`].total++;
      stats.mobileUsers[`y${order.year}`].months[order.month]++;
      stats.mobileUsers[`y${order.year}`].days[order.day]++;
      stats.mobileUsers[`y${order.year}`].hours[order.hour]++;
    }
  };

  const updateDesktopUsers = (order) => {
    if (order.deviceType === "desktop") {
      stats.desktopUsers.all++;
      stats.desktopUsers[`y${order.year}`].total++;
      stats.desktopUsers[`y${order.year}`].months[order.month]++;
      stats.desktopUsers[`y${order.year}`].days[order.day]++;
      stats.desktopUsers[`y${order.year}`].hours[order.hour]++;
    }
  };
  const orders = await customerOrders.find({}, {__v: 0});
  await orders.forEach((order) => {
    updateCount(order);
    updateRevenue(order);
    updateMobileUsers(order);
    updateDesktopUsers(order);
  });

  updateAverageOrderTotal();
  await Util.create({
    name: "Stats",
    utilData: stats,
  });
  res.status(201).json(stats);
});

admin.get("/api/orders/api", async (req, res) => {
  res.status(200).send("Orders API is running.");
});

// Getting the status of online site.
admin.get("/api/online", async (req, res) => {
  await Util.find({name: "Online Status"}, {__v: 0}, (err, docs) => {
    if (!err) {
      res.send(docs[0].online);
    } else {
      res.status(401).json({
        msg: "Error fetching online status",
      });
    }
  });
});

// Turn Online Off
admin.post("/api/online/off", async (req, res) => {
  await Util.findOneAndUpdate(
    {name: "Online Status"},
    {$set: {online: false}},
    {new: true},
    (err, docs) => {
      if (!err) {
        res.status(200).send(`Status updated to ${false}`);
      } else {
        res.status(401).json({
          msg: "Error fetching online status",
        });
      }
    }
  );
});

// Turn Online On
admin.post("/api/online/on", async (req, res) => {
  await Util.findOneAndUpdate(
    {name: "Online Status"},
    {$set: {online: true}},
    {new: true},
    (err, docs) => {
      if (!err) {
        res.status(200).send(`Status updated to ${true}`);
      } else {
        res.status(401).json({
          msg: "Error fetching online status",
        });
      }
    }
  );
});

export default admin;
