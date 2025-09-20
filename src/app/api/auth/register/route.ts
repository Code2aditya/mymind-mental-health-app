import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      fullName,
      userType,
      // Student fields
      age,
      university,
      course,
      year,
      // Doctor fields
      specialization,
      experience,
      licenseNumber,
      consultationFee,
    } = await request.json();

    if (!email || !password || !fullName || !userType) {
      return NextResponse.json(
        { error: "Email, password, full name, and user type are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userData = {
      email,
      password: hashedPassword,
      name: fullName,
      role: userType.toUpperCase() as UserRole,
    };

    const user = await db.user.create({
      data: userData,
    });

    // Create profile based on user type
    if (userType === "STUDENT") {
      await db.studentProfile.create({
        data: {
          userId: user.id,
          age: age ? parseInt(age) : null,
          university: university || null,
          course: course || null,
          year: year ? parseInt(year) : null,
        },
      });
    } else if (userType === "DOCTOR") {
      // Validate required doctor fields
      if (!specialization || !licenseNumber) {
        await db.user.delete({
          where: { id: user.id },
        });
        return NextResponse.json(
          { error: "Specialization and license number are required for doctors" },
          { status: 400 }
        );
      }

      await db.doctorProfile.create({
        data: {
          userId: user.id,
          specialization,
          experience: experience ? parseInt(experience) : null,
          licenseNumber,
          consultationFee: consultationFee ? parseInt(consultationFee) : null,
        },
      });
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Registration successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}