import dbConnect from "../../../../lib/db";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";

/**
 * Get orders for logged-in user only
 */
export async function POST(req) {
  try {
    await dbConnect();

    const { userId } = await req.json();

    // 🔐 auth check
    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // 🔍 fetch only this user's orders
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      ok: true,
      orders,
    });
  } catch (err) {
    console.error("MY_ORDERS_API_ERROR:", err);
    return NextResponse.json(
      { ok: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
