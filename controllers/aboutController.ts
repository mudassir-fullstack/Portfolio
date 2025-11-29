import { use } from 'react'
import { NextResponse } from "next/server";
import About from "@/models/About";
import { About as AboutType } from "@/types/about";
import cloudinary from "@/lib/cloudinary";

//GET
export const GET = async () => {
  try {
    const about = await About.find().lean();

    if (!about || about.length === 0) {
      return NextResponse.json(
        { success: false, message: "No about data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data fetched successfully", data: about },
      { status: 200 } 
    );
  } catch (error: any) {
    console.error("❌ Error fetching About data:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching data" },
      { status: 500 }
    );
  }
};

// GET BY ID
export const GET_BY_ID = async (
  req: Request,
 {params}:{params:Promise<{id:string}>}
) => {
  try {
    const {id}=await params;
    const aboutData = await About.findById(id);

    if (!aboutData) {
      return NextResponse.json(
        { success: false, message: "Document not found why yr" },
        { status: 404 }
      );
    }
console.log("data exist", aboutData)
    return NextResponse.json(
      { success: true, data: aboutData },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};

//CREATE
export const POST = async (req: Request) => {
  try {
    let name,title, email, description, phone, address, linkedin, profilePicture;

    // 🧠 Detect if it's FormData or JSON
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      // ✅ Handle FormData (for file uploads)
      const formData = await req.formData();
      title = formData.getAll("title") as string[];
      name = formData.get("name") as string;
      email = formData.get("email") as string;
      description = formData.get("description") as string;
      phone = formData.get("phone") as string;
      address = formData.get("address") as string;
      linkedin = formData.get("linkedin") as string;
      const file = formData.get("profilePicture") as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // ✅ Upload to Cloudinary
        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "portfolio/about" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });

        profilePicture = (uploaded as any).secure_url;
      }
    } else {
      // ✅ Handle normal JSON body
      const body = (await req.json()) as AboutType;
      ({ profilePicture, name, email, description, phone, address, linkedin, title } = body);
    }

    if (!name || !email || !description || !phone || !linkedin) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Create About document
    const newAbout = new About({
      profilePicture: profilePicture || "",
      title: title || [],
      name,
      email,
      description,
      phone,
      address,
      linkedin,
    });

    await newAbout.save();

    return NextResponse.json(
      { success: true, message: "About section created successfully", data: newAbout },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating About data:", error);
    return NextResponse.json(
      { success: false, message: "Server error while creating About data", error: error.message },
      { status: 500 }
    );
  }
};

// UPDATE
export const PATCH = async (
  req: Request,
   {params}:{params:Promise<{id:string}>}
) => {
  try {
    const {id}=await params;
    // ✅ Check if document exists
    const existingAbout = await About.findById(id);
    if (!existingAbout) {
      return NextResponse.json(
        { success: false, message: "Document not found" },
        { status: 404 }
      );
    }

    let updateFields: any = {};
    
    const contentType = req.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      
      Object.entries({
        name: formData.get("name"),
        email: formData.get("email"),
        description: formData.get("description"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        linkedin: formData.get("linkedin"),
      }).forEach(([key, value]) => {
        if (value) updateFields[key as keyof AboutType] = value as any;
      });

      const titles = formData.getAll("title") as string[];
      if (titles.length) updateFields.title = titles;

      const file = formData.get("profilePicture") as File | null;
      if (file?.size) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "portfolio/about" }, (err, result) => 
              err ? reject(err) : resolve(result)
            )
            .end(buffer);
        });

        updateFields.profilePicture = uploaded.secure_url;

        if (existingAbout.profilePicture) {
          const publicId = existingAbout.profilePicture.split("/").slice(-2).join("/").split(".")[0];
          await cloudinary.uploader.destroy(publicId).catch(() => {});
        }
      }
    } else {
      const body = await req.json() as Partial<AboutType>;
      Object.keys(body).forEach(key => {
        if (body[key as keyof AboutType] !== undefined) {
          updateFields[key as keyof AboutType] = body[key as keyof AboutType];
        }
      });
    }

    if (!Object.keys(updateFields).length) {
      return NextResponse.json(
        { success: false, message: "No fields to update" },
        { status: 400 }
      );
    }

    const updatedAbout = await About.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, message: "Updated successfully", data: updatedAbout },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error updating:", error);
    return NextResponse.json(
      { success: false, message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
};

// DELETE
export const DELETE = async (
  req: Request,
   {params}:{params:Promise<{id:string}>}
) => {
  try {
    const {id}=await params;
    const deletedData = await About.findByIdAndDelete(id);

    if (!deletedData) {
      return NextResponse.json(
        { success: false, message: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};