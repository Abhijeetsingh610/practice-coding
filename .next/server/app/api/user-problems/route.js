/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user-problems/route";
exports.ids = ["app/api/user-problems/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user-problems/route.ts":
/*!****************************************!*\
  !*** ./app/api/user-problems/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/supabase-admin */ \"(rsc)/./lib/supabase-admin.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n// Helper function to safely serialize dates and objects\nfunction safelySerialize(data) {\n    if (!data) return null;\n    // Handle date fields specifically\n    const safeData = {\n        id: data.id,\n        user_id: data.user_id,\n        problem_id: data.problem_id,\n        status: data.status,\n        notes: data.notes,\n        created_at: data.created_at ? new Date(data.created_at).toISOString() : null,\n        updated_at: data.updated_at ? new Date(data.updated_at).toISOString() : null\n    };\n    return safeData;\n}\n// Get all user problems\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const userId = searchParams.get(\"userId\");\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"User ID is required\"\n            }, {\n                status: 400\n            });\n        }\n        // Use admin client for server operations to bypass RLS\n        const supabase = (0,_lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__.getSupabaseAdmin)();\n        try {\n            // Only select the fields we need\n            const { data, error } = await supabase.from(\"user_problems\").select(\"id, user_id, problem_id, status, notes, created_at, updated_at\").eq(\"user_id\", userId);\n            if (error) {\n                console.error(\"Supabase error details:\", JSON.stringify(error, null, 2));\n                throw error;\n            }\n            // Safely serialize the data\n            const safeData = data ? data.map((item)=>safelySerialize(item)) : [];\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(safeData);\n        } catch (supabaseError) {\n            console.error(\"Supabase error:\", supabaseError);\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Database error\",\n                message: supabaseError.message,\n                details: supabaseError.details || \"No additional details\"\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error(\"Error fetching user problems:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Error fetching user problems\",\n            message: error.message || \"Unknown error\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Create or update a user problem\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { userId, problemId, status, notes } = body;\n        // Validate required fields\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"User ID is required\"\n            }, {\n                status: 400\n            });\n        }\n        if (!problemId || typeof problemId !== \"number\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Valid problem ID is required\"\n            }, {\n                status: 400\n            });\n        }\n        const validStatuses = [\n            \"solved\",\n            \"attempted\",\n            \"saved\",\n            \"not_solved\"\n        ];\n        if (!status || !validStatuses.includes(status)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Valid status is required\"\n            }, {\n                status: 400\n            });\n        }\n        // Use admin client for server operations to bypass RLS\n        const supabase = (0,_lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__.getSupabaseAdmin)();\n        try {\n            // Use upsert for simplified operation\n            const { data, error } = await supabase.from(\"user_problems\").upsert({\n                user_id: userId,\n                problem_id: problemId,\n                status,\n                notes,\n                updated_at: new Date().toISOString()\n            }, {\n                // This tells Supabase to match on these columns for the upsert\n                onConflict: \"user_id,problem_id\",\n                // Return the updated/inserted row\n                returning: \"representation\"\n            });\n            if (error) {\n                console.error(\"Supabase upsert error:\", error);\n                throw error;\n            }\n            // Safely serialize the response data\n            const safeData = data && data.length > 0 ? safelySerialize(data[0]) : null;\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(safeData);\n        } catch (supabaseError) {\n            console.error(\"Supabase error:\", supabaseError);\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Database error\",\n                message: supabaseError.message,\n                details: supabaseError.details || \"No additional details\"\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error(\"Error updating user problem:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Error updating user problem\",\n            message: error.message || \"Unknown error\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Delete a user problem\nasync function DELETE(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const id = searchParams.get(\"id\");\n        if (!id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Problem ID is required\"\n            }, {\n                status: 400\n            });\n        }\n        // Use admin client for server operations to bypass RLS\n        const supabase = (0,_lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__.getSupabaseAdmin)();\n        try {\n            const { error } = await supabase.from(\"user_problems\").delete().eq(\"id\", id);\n            if (error) {\n                console.error(\"Supabase delete error:\", error);\n                throw error;\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                message: \"Problem deleted successfully\"\n            });\n        } catch (supabaseError) {\n            console.error(\"Supabase error:\", supabaseError);\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Database error\",\n                message: supabaseError.message,\n                details: supabaseError.details || \"No additional details\"\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error(\"Error deleting user problem:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Error deleting user problem\",\n            message: error.message || \"Unknown error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsZ0NBQWdDQTtRQUM5QyxPQUFPckIscURBQVlBLENBQUNvQixJQUFJLENBQ3RCO1lBQ0VDLE9BQU87WUFDUFcsU0FBU1gsTUFBTVcsT0FBTyxJQUFJO1FBQzVCLEdBQ0E7WUFBRXpCLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJFOlxccHJhY3RpY2UtY29kaW5nXFxhcHBcXGFwaVxcdXNlci1wcm9ibGVtc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U3VwYWJhc2VBZG1pbiB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS1hZG1pblwiXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gc2FmZWx5IHNlcmlhbGl6ZSBkYXRlcyBhbmQgb2JqZWN0c1xuZnVuY3Rpb24gc2FmZWx5U2VyaWFsaXplKGRhdGE6IGFueSkge1xuICBpZiAoIWRhdGEpIHJldHVybiBudWxsXG5cbiAgLy8gSGFuZGxlIGRhdGUgZmllbGRzIHNwZWNpZmljYWxseVxuICBjb25zdCBzYWZlRGF0YSA9IHtcbiAgICBpZDogZGF0YS5pZCxcbiAgICB1c2VyX2lkOiBkYXRhLnVzZXJfaWQsXG4gICAgcHJvYmxlbV9pZDogZGF0YS5wcm9ibGVtX2lkLFxuICAgIHN0YXR1czogZGF0YS5zdGF0dXMsXG4gICAgbm90ZXM6IGRhdGEubm90ZXMsXG4gICAgY3JlYXRlZF9hdDogZGF0YS5jcmVhdGVkX2F0ID8gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KS50b0lTT1N0cmluZygpIDogbnVsbCxcbiAgICB1cGRhdGVkX2F0OiBkYXRhLnVwZGF0ZWRfYXQgPyBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLnRvSVNPU3RyaW5nKCkgOiBudWxsLFxuICB9XG5cbiAgcmV0dXJuIHNhZmVEYXRhXG59XG5cbi8vIEdldCBhbGwgdXNlciBwcm9ibGVtc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gICAgY29uc3QgdXNlcklkID0gc2VhcmNoUGFyYW1zLmdldChcInVzZXJJZFwiKVxuXG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVzZXIgSUQgaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuXG4gICAgLy8gVXNlIGFkbWluIGNsaWVudCBmb3Igc2VydmVyIG9wZXJhdGlvbnMgdG8gYnlwYXNzIFJMU1xuICAgIGNvbnN0IHN1cGFiYXNlID0gZ2V0U3VwYWJhc2VBZG1pbigpXG5cbiAgICB0cnkge1xuICAgICAgLy8gT25seSBzZWxlY3QgdGhlIGZpZWxkcyB3ZSBuZWVkXG4gICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInVzZXJfcHJvYmxlbXNcIilcbiAgICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9ibGVtX2lkLCBzdGF0dXMsIG5vdGVzLCBjcmVhdGVkX2F0LCB1cGRhdGVkX2F0XCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlN1cGFiYXNlIGVycm9yIGRldGFpbHM6XCIsIEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKSlcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cblxuICAgICAgLy8gU2FmZWx5IHNlcmlhbGl6ZSB0aGUgZGF0YVxuICAgICAgY29uc3Qgc2FmZURhdGEgPSBkYXRhID8gZGF0YS5tYXAoKGl0ZW0pID0+IHNhZmVseVNlcmlhbGl6ZShpdGVtKSkgOiBbXVxuXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oc2FmZURhdGEpXG4gICAgfSBjYXRjaCAoc3VwYWJhc2VFcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU3VwYWJhc2UgZXJyb3I6XCIsIHN1cGFiYXNlRXJyb3IpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlcnJvcjogXCJEYXRhYmFzZSBlcnJvclwiLFxuICAgICAgICAgIG1lc3NhZ2U6IHN1cGFiYXNlRXJyb3IubWVzc2FnZSxcbiAgICAgICAgICBkZXRhaWxzOiBzdXBhYmFzZUVycm9yLmRldGFpbHMgfHwgXCJObyBhZGRpdGlvbmFsIGRldGFpbHNcIixcbiAgICAgICAgfSxcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9LFxuICAgICAgKVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIHByb2JsZW1zOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7XG4gICAgICAgIGVycm9yOiBcIkVycm9yIGZldGNoaW5nIHVzZXIgcHJvYmxlbXNcIixcbiAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCBcIlVua25vd24gZXJyb3JcIixcbiAgICAgIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH0sXG4gICAgKVxuICB9XG59XG5cbi8vIENyZWF0ZSBvciB1cGRhdGUgYSB1c2VyIHByb2JsZW1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgICBjb25zdCB7IHVzZXJJZCwgcHJvYmxlbUlkLCBzdGF0dXMsIG5vdGVzIH0gPSBib2R5XG5cbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBmaWVsZHNcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVXNlciBJRCBpcyByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICBpZiAoIXByb2JsZW1JZCB8fCB0eXBlb2YgcHJvYmxlbUlkICE9PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJWYWxpZCBwcm9ibGVtIElEIGlzIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkU3RhdHVzZXMgPSBbXCJzb2x2ZWRcIiwgXCJhdHRlbXB0ZWRcIiwgXCJzYXZlZFwiLCBcIm5vdF9zb2x2ZWRcIl1cbiAgICBpZiAoIXN0YXR1cyB8fCAhdmFsaWRTdGF0dXNlcy5pbmNsdWRlcyhzdGF0dXMpKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJWYWxpZCBzdGF0dXMgaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuXG4gICAgLy8gVXNlIGFkbWluIGNsaWVudCBmb3Igc2VydmVyIG9wZXJhdGlvbnMgdG8gYnlwYXNzIFJMU1xuICAgIGNvbnN0IHN1cGFiYXNlID0gZ2V0U3VwYWJhc2VBZG1pbigpXG5cbiAgICB0cnkge1xuICAgICAgLy8gVXNlIHVwc2VydCBmb3Igc2ltcGxpZmllZCBvcGVyYXRpb25cbiAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJ1c2VyX3Byb2JsZW1zXCIpLnVwc2VydChcbiAgICAgICAge1xuICAgICAgICAgIHVzZXJfaWQ6IHVzZXJJZCxcbiAgICAgICAgICBwcm9ibGVtX2lkOiBwcm9ibGVtSWQsXG4gICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgIG5vdGVzLFxuICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIC8vIFRoaXMgdGVsbHMgU3VwYWJhc2UgdG8gbWF0Y2ggb24gdGhlc2UgY29sdW1ucyBmb3IgdGhlIHVwc2VydFxuICAgICAgICAgIG9uQ29uZmxpY3Q6IFwidXNlcl9pZCxwcm9ibGVtX2lkXCIsXG4gICAgICAgICAgLy8gUmV0dXJuIHRoZSB1cGRhdGVkL2luc2VydGVkIHJvd1xuICAgICAgICAgIHJldHVybmluZzogXCJyZXByZXNlbnRhdGlvblwiLFxuICAgICAgICB9LFxuICAgICAgKVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlN1cGFiYXNlIHVwc2VydCBlcnJvcjpcIiwgZXJyb3IpXG4gICAgICAgIHRocm93IGVycm9yXG4gICAgICB9XG5cbiAgICAgIC8vIFNhZmVseSBzZXJpYWxpemUgdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgIGNvbnN0IHNhZmVEYXRhID0gZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDAgPyBzYWZlbHlTZXJpYWxpemUoZGF0YVswXSkgOiBudWxsXG5cbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihzYWZlRGF0YSlcbiAgICB9IGNhdGNoIChzdXBhYmFzZUVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTdXBhYmFzZSBlcnJvcjpcIiwgc3VwYWJhc2VFcnJvcilcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAge1xuICAgICAgICAgIGVycm9yOiBcIkRhdGFiYXNlIGVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZTogc3VwYWJhc2VFcnJvci5tZXNzYWdlLFxuICAgICAgICAgIGRldGFpbHM6IHN1cGFiYXNlRXJyb3IuZGV0YWlscyB8fCBcIk5vIGFkZGl0aW9uYWwgZGV0YWlsc1wiLFxuICAgICAgICB9LFxuICAgICAgICB7IHN0YXR1czogNTAwIH0sXG4gICAgICApXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIHVzZXIgcHJvYmxlbTpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAge1xuICAgICAgICBlcnJvcjogXCJFcnJvciB1cGRhdGluZyB1c2VyIHByb2JsZW1cIixcbiAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCBcIlVua25vd24gZXJyb3JcIixcbiAgICAgIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH0sXG4gICAgKVxuICB9XG59XG5cbi8vIERlbGV0ZSBhIHVzZXIgcHJvYmxlbVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gICAgY29uc3QgaWQgPSBzZWFyY2hQYXJhbXMuZ2V0KFwiaWRcIilcblxuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlByb2JsZW0gSUQgaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuXG4gICAgLy8gVXNlIGFkbWluIGNsaWVudCBmb3Igc2VydmVyIG9wZXJhdGlvbnMgdG8gYnlwYXNzIFJMU1xuICAgIGNvbnN0IHN1cGFiYXNlID0gZ2V0U3VwYWJhc2VBZG1pbigpXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInVzZXJfcHJvYmxlbXNcIikuZGVsZXRlKCkuZXEoXCJpZFwiLCBpZClcblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTdXBhYmFzZSBkZWxldGUgZXJyb3I6XCIsIGVycm9yKVxuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlByb2JsZW0gZGVsZXRlZCBzdWNjZXNzZnVsbHlcIiB9KVxuICAgIH0gY2F0Y2ggKHN1cGFiYXNlRXJyb3I6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlN1cGFiYXNlIGVycm9yOlwiLCBzdXBhYmFzZUVycm9yKVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7XG4gICAgICAgICAgZXJyb3I6IFwiRGF0YWJhc2UgZXJyb3JcIixcbiAgICAgICAgICBtZXNzYWdlOiBzdXBhYmFzZUVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgZGV0YWlsczogc3VwYWJhc2VFcnJvci5kZXRhaWxzIHx8IFwiTm8gYWRkaXRpb25hbCBkZXRhaWxzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfSxcbiAgICAgIClcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgdXNlciBwcm9ibGVtOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7XG4gICAgICAgIGVycm9yOiBcIkVycm9yIGRlbGV0aW5nIHVzZXIgcHJvYmxlbVwiLFxuICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIHx8IFwiVW5rbm93biBlcnJvclwiLFxuICAgICAgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfSxcbiAgICApXG4gIH1cbn1cblxuIl0sIm5hbWVzIjpbImdldFN1cGFiYXNlQWRtaW4iLCJOZXh0UmVzcG9uc2UiLCJzYWZlbHlTZXJpYWxpemUiLCJkYXRhIiwic2FmZURhdGEiLCJpZCIsInVzZXJfaWQiLCJwcm9ibGVtX2lkIiwic3RhdHVzIiwibm90ZXMiLCJjcmVhdGVkX2F0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidXBkYXRlZF9hdCIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJ1c2VySWQiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdXBhYmFzZSIsImZyb20iLCJzZWxlY3QiLCJlcSIsImNvbnNvbGUiLCJKU09OIiwic3RyaW5naWZ5IiwibWFwIiwiaXRlbSIsInN1cGFiYXNlRXJyb3IiLCJtZXNzYWdlIiwiZGV0YWlscyIsIlBPU1QiLCJib2R5IiwicHJvYmxlbUlkIiwidmFsaWRTdGF0dXNlcyIsImluY2x1ZGVzIiwidXBzZXJ0Iiwib25Db25mbGljdCIsInJldHVybmluZyIsImxlbmd0aCIsIkRFTEVURSIsImRlbGV0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user-problems/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase-admin.ts":
/*!*******************************!*\
  !*** ./lib/supabase-admin.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Environment variables for Supabase\nconst supabaseUrl = \"https://nrrggriaxgwkfyiocafi.supabase.co\";\nconst supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n// Create a singleton instance for admin/service operations\nlet supabaseAdminInstance = null;\nfunction getSupabaseAdmin() {\n    if (!supabaseServiceKey) {\n        throw new Error(\"SUPABASE_SERVICE_ROLE_KEY is not defined\");\n    }\n    if (!supabaseAdminInstance) {\n        supabaseAdminInstance = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseServiceKey, {\n            auth: {\n                persistSession: false,\n                autoRefreshToken: false\n            }\n        });\n    }\n    return supabaseAdminInstance;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UtYWRtaW4udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0Q7QUFFcEQscUNBQXFDO0FBQ3JDLE1BQU1DLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxxQkFBcUJILFFBQVFDLEdBQUcsQ0FBQ0cseUJBQXlCO0FBRWhFLDJEQUEyRDtBQUMzRCxJQUFJQyx3QkFBZ0U7QUFFN0QsU0FBU0M7SUFDZCxJQUFJLENBQUNILG9CQUFvQjtRQUN2QixNQUFNLElBQUlJLE1BQU07SUFDbEI7SUFFQSxJQUFJLENBQUNGLHVCQUF1QjtRQUMxQkEsd0JBQXdCUCxtRUFBWUEsQ0FBQ0MsYUFBYUksb0JBQW9CO1lBQ3BFSyxNQUFNO2dCQUNKQyxnQkFBZ0I7Z0JBQ2hCQyxrQkFBa0I7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBT0w7QUFDVCIsInNvdXJjZXMiOlsiRTpcXHByYWN0aWNlLWNvZGluZ1xcbGliXFxzdXBhYmFzZS1hZG1pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCJcblxuLy8gRW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciBTdXBhYmFzZVxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXG5jb25zdCBzdXBhYmFzZVNlcnZpY2VLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIVxuXG4vLyBDcmVhdGUgYSBzaW5nbGV0b24gaW5zdGFuY2UgZm9yIGFkbWluL3NlcnZpY2Ugb3BlcmF0aW9uc1xubGV0IHN1cGFiYXNlQWRtaW5JbnN0YW5jZTogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50PiB8IG51bGwgPSBudWxsXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBhYmFzZUFkbWluKCkge1xuICBpZiAoIXN1cGFiYXNlU2VydmljZUtleSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkgaXMgbm90IGRlZmluZWRcIilcbiAgfVxuXG4gIGlmICghc3VwYWJhc2VBZG1pbkluc3RhbmNlKSB7XG4gICAgc3VwYWJhc2VBZG1pbkluc3RhbmNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZVNlcnZpY2VLZXksIHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgcGVyc2lzdFNlc3Npb246IGZhbHNlLFxuICAgICAgICBhdXRvUmVmcmVzaFRva2VuOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBzdXBhYmFzZUFkbWluSW5zdGFuY2Vcbn1cblxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlU2VydmljZUtleSIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJzdXBhYmFzZUFkbWluSW5zdGFuY2UiLCJnZXRTdXBhYmFzZUFkbWluIiwiRXJyb3IiLCJhdXRoIiwicGVyc2lzdFNlc3Npb24iLCJhdXRvUmVmcmVzaFRva2VuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase-admin.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Froute&page=%2Fapi%2Fuser-problems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Froute&page=%2Fapi%2Fuser-problems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_practice_coding_app_api_user_problems_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user-problems/route.ts */ \"(rsc)/./app/api/user-problems/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user-problems/route\",\n        pathname: \"/api/user-problems\",\n        filename: \"route\",\n        bundlePath: \"app/api/user-problems/route\"\n    },\n    resolvedPagePath: \"E:\\\\practice-coding\\\\app\\\\api\\\\user-problems\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_practice_coding_app_api_user_problems_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyLXByb2JsZW1zJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyLXByb2JsZW1zJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlci1wcm9ibGVtcyUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDcHJhY3RpY2UtY29kaW5nJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1FJTNBJTVDcHJhY3RpY2UtY29kaW5nJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNNO0FBQ25GO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJFOlxcXFxwcmFjdGljZS1jb2RpbmdcXFxcYXBwXFxcXGFwaVxcXFx1c2VyLXByb2JsZW1zXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91c2VyLXByb2JsZW1zL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlci1wcm9ibGVtc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci1wcm9ibGVtcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkU6XFxcXHByYWN0aWNlLWNvZGluZ1xcXFxhcHBcXFxcYXBpXFxcXHVzZXItcHJvYmxlbXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Froute&page=%2Fapi%2Fuser-problems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Froute&page=%2Fapi%2Fuser-problems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();