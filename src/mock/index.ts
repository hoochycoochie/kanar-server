import faker from "faker";
import Role from "../entities/role.entity";
import Member from "../entities/member.entity";

const TOTAL_PRODUCTS = 70;

const TOTAL_DRINKS = 70;
export default async () => {
  try {
    const roleAdmin = new Role();
    roleAdmin.name = "admin";

    const roleSaler = new Role();
    roleSaler.name = "saler";

    const roleManager = new Role();
    roleManager.name = "manager";

    await roleAdmin.save();
    await roleSaler.save();
    await roleManager.save();

    const user = new Member();
    user.name = "Fall";
    user.lastname = "Dramane";
    user.password = "amadou";
    user.confirmed = true;
    user.is_active = true;
    user.email = "toto@live.fr";
    user.picture =
      "https://cdn4.buysellads.net/uu/1/41334/1550855362-cc_dark.png";
    user.picture_public_id = "toto";

    user.roles = [roleAdmin, roleManager];

    await user.save();
    console.log("roleAdmin", roleAdmin);
  } catch (error) {
    console.log("error=============", error.message);
    throw error;
  }
};
