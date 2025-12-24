import dbConnect from "@/lib/db";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { orderId } = params;
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const order = await Order.findOne({
  orderId,
  userId: String(userId), // 🔥 FIX: force string match
}).lean();


    if (!order) {
      return NextResponse.json(
        { ok: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      order,
    });
  } catch (err) {
    console.error("ORDER_DETAILS_ERROR:", err);
    return NextResponse.json(
      { ok: false, message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
