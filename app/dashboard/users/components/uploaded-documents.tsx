"use client"

import { useState } from "react"
import {
  Download,
  Trash2,
  FileText,
  Image,
  FileArchive,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Document {
  id: string
  name: string
  type: "pdf" | "image" | "archive" | "document"
  size: string
  uploadedDate: string
  verified: boolean
}

interface UploadedDocumentsProps {
  userId: number
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "ID_Verification.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedDate: "2024-01-15",
    verified: true,
  },
  {
    id: "2",
    name: "Address_Proof.pdf",
    type: "pdf",
    size: "1.8 MB",
    uploadedDate: "2024-01-14",
    verified: true,
  },
  {
    id: "3",
    name: "Profile_Picture.jpg",
    type: "image",
    size: "456 KB",
    uploadedDate: "2024-01-10",
    verified: true,
  },
  {
    id: "4",
    name: "Tax_Documents.zip",
    type: "archive",
    size: "5.2 MB",
    uploadedDate: "2024-01-05",
    verified: false,
  },
  {
    id: "5",
    name: "Bank_Statement.pdf",
    type: "pdf",
    size: "3.1 MB",
    uploadedDate: "2024-01-01",
    verified: true,
  },
]

export function UploadedDocuments({ userId }: UploadedDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "image":
        return <Image className="h-5 w-5 text-blue-500" />
      case "archive":
        return <FileArchive className="h-5 w-5 text-orange-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const handleDownload = (docId: string, docName: string) => {
    console.log(`[API CALL] Download document: ${docName} (ID: ${docId})`)
  }

  const handleDelete = (docId: string, docName: string) => {
    console.log(`[API CALL] Delete document: ${docName} (ID: ${docId})`)
    setDocuments(documents.filter((doc) => doc.id !== docId))
  }

  const handleVerify = (docId: string, docName: string) => {
    console.log(`[API CALL] Verify document: ${docName} (ID: ${docId})`)
    setDocuments(
      documents.map((doc) =>
        doc.id === docId ? { ...doc, verified: !doc.verified } : doc
      )
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>
                All documents uploaded by this user ({documents.length} files)
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No documents uploaded</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getFileIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{new Date(doc.uploadedDate).toLocaleDateString()}</span>
                        {doc.verified && (
                          <>
                            <span>•</span>
                            <span className="text-green-600 font-medium">Verified</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleDownload(doc.id, doc.name)}
                        className="cursor-pointer"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleVerify(doc.id, doc.name)}
                        className="cursor-pointer"
                      >
                        {doc.verified ? "Mark as Unverified" : "Mark as Verified"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(doc.id, doc.name)}
                        className="cursor-pointer text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Moderation Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Document Moderation Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-blue-50">
              <p className="text-sm font-medium text-muted-foreground">Total Uploads</p>
              <p className="text-2xl font-bold mt-2">{documents.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <p className="text-sm font-medium text-muted-foreground">Verified</p>
              <p className="text-2xl font-bold mt-2">
                {documents.filter((d) => d.verified).length}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50">
              <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold mt-2">
                {documents.filter((d) => !d.verified).length}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50">
              <p className="text-sm font-medium text-muted-foreground">Total Size</p>
              <p className="text-2xl font-bold mt-2">12.5 MB</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
