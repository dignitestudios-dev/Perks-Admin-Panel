"use client"

import {
  Download,
  FileText,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserDetail } from "@/lib/api/user-details.api"

interface UploadedDocumentsProps {
  user: UserDetail
}

export function UploadedDocuments({ user }: UploadedDocumentsProps) {
  const documents = user.documents || []

  if (documents.length === 0) {
    return (
      <Card className="border border-primary/10 shadow-lg pt-0">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border-b border-primary/10 rounded-t-lg pt-6">
          <CardTitle className="text-primary text-xl">Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No documents uploaded yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border-b border-primary/10 rounded-t-lg">
        <CardTitle className="text-primary text-xl">Uploaded Documents ({documents.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-gradient-to-r from-primary/[0.03] to-transparent hover:from-primary/5 hover:to-primary/[0.02] transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.url}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (doc.url.startsWith('http')) {
                    window.open(doc.url, '_blank')
                  }
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
