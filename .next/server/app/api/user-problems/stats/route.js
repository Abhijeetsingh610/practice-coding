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
exports.id = "app/api/user-problems/stats/route";
exports.ids = ["app/api/user-problems/stats/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user-problems/stats/route.ts":
/*!**********************************************!*\
  !*** ./app/api/user-problems/stats/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/supabase-admin */ \"(rsc)/./lib/supabase-admin.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const userId = searchParams.get(\"userId\");\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"User ID is required\"\n            }, {\n                status: 400\n            });\n        }\n        // Use admin client for server operations to bypass RLS\n        const supabase = (0,_lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__.getSupabaseAdmin)();\n        try {\n            // Get total problems count - only count, don't fetch data\n            const { count: totalProblems, error: totalError } = await supabase.from(\"coding_problems\").select(\"*\", {\n                count: \"exact\",\n                head: true\n            });\n            if (totalError) {\n                console.error(\"Supabase total count error:\", totalError);\n                throw totalError;\n            }\n            // Get user problems by status - only select the status field\n            const { data: userProblems, error: userError } = await supabase.from(\"user_problems\").select(\"status\").eq(\"user_id\", userId);\n            if (userError) {\n                console.error(\"Supabase user problems error:\", userError);\n                throw userError;\n            }\n            // Calculate stats\n            const stats = {\n                solved: 0,\n                attempted: 0,\n                saved: 0,\n                total: totalProblems || 0\n            };\n            if (Array.isArray(userProblems)) {\n                userProblems.forEach((problem)=>{\n                    if (problem.status === \"solved\") {\n                        stats.solved++;\n                    } else if (problem.status === \"attempted\") {\n                        stats.attempted++;\n                    } else if (problem.status === \"saved\") {\n                        stats.saved++;\n                    }\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(stats);\n        } catch (supabaseError) {\n            console.error(\"Supabase error:\", supabaseError);\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Database error\",\n                message: supabaseError.message,\n                details: supabaseError.details || \"No additional details\"\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error(\"Error fetching user problem stats:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Error fetching user problem stats\",\n            message: error.message || \"Unknown error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXItcHJvYmxlbXMvc3RhdHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXVEO0FBQ2I7QUFFbkMsZUFBZUUsSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztRQUM1QyxNQUFNQyxTQUFTSCxhQUFhSSxHQUFHLENBQUM7UUFFaEMsSUFBSSxDQUFDRCxRQUFRO1lBQ1gsT0FBT04scURBQVlBLENBQUNRLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFzQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDM0U7UUFFQSx1REFBdUQ7UUFDdkQsTUFBTUMsV0FBV1oscUVBQWdCQTtRQUVqQyxJQUFJO1lBQ0YsMERBQTBEO1lBQzFELE1BQU0sRUFBRWEsT0FBT0MsYUFBYSxFQUFFSixPQUFPSyxVQUFVLEVBQUUsR0FBRyxNQUFNSCxTQUN2REksSUFBSSxDQUFDLG1CQUNMQyxNQUFNLENBQUMsS0FBSztnQkFBRUosT0FBTztnQkFBU0ssTUFBTTtZQUFLO1lBRTVDLElBQUlILFlBQVk7Z0JBQ2RJLFFBQVFULEtBQUssQ0FBQywrQkFBK0JLO2dCQUM3QyxNQUFNQTtZQUNSO1lBRUEsNkRBQTZEO1lBQzdELE1BQU0sRUFBRUssTUFBTUMsWUFBWSxFQUFFWCxPQUFPWSxTQUFTLEVBQUUsR0FBRyxNQUFNVixTQUNwREksSUFBSSxDQUFDLGlCQUNMQyxNQUFNLENBQUMsVUFDUE0sRUFBRSxDQUFDLFdBQVdoQjtZQUVqQixJQUFJZSxXQUFXO2dCQUNiSCxRQUFRVCxLQUFLLENBQUMsaUNBQWlDWTtnQkFDL0MsTUFBTUE7WUFDUjtZQUVBLGtCQUFrQjtZQUNsQixNQUFNRSxRQUFRO2dCQUNaQyxRQUFRO2dCQUNSQyxXQUFXO2dCQUNYQyxPQUFPO2dCQUNQQyxPQUFPZCxpQkFBaUI7WUFDMUI7WUFFQSxJQUFJZSxNQUFNQyxPQUFPLENBQUNULGVBQWU7Z0JBQy9CQSxhQUFhVSxPQUFPLENBQUMsQ0FBQ0M7b0JBQ3BCLElBQUlBLFFBQVFyQixNQUFNLEtBQUssVUFBVTt3QkFDL0JhLE1BQU1DLE1BQU07b0JBQ2QsT0FBTyxJQUFJTyxRQUFRckIsTUFBTSxLQUFLLGFBQWE7d0JBQ3pDYSxNQUFNRSxTQUFTO29CQUNqQixPQUFPLElBQUlNLFFBQVFyQixNQUFNLEtBQUssU0FBUzt3QkFDckNhLE1BQU1HLEtBQUs7b0JBQ2I7Z0JBQ0Y7WUFDRjtZQUVBLE9BQU8xQixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDZTtRQUMzQixFQUFFLE9BQU9TLGVBQW9CO1lBQzNCZCxRQUFRVCxLQUFLLENBQUMsbUJBQW1CdUI7WUFDakMsT0FBT2hDLHFEQUFZQSxDQUFDUSxJQUFJLENBQ3RCO2dCQUNFQyxPQUFPO2dCQUNQd0IsU0FBU0QsY0FBY0MsT0FBTztnQkFDOUJDLFNBQVNGLGNBQWNFLE9BQU8sSUFBSTtZQUNwQyxHQUNBO2dCQUFFeEIsUUFBUTtZQUFJO1FBRWxCO0lBQ0YsRUFBRSxPQUFPRCxPQUFZO1FBQ25CUyxRQUFRVCxLQUFLLENBQUMsc0NBQXNDQTtRQUNwRCxPQUFPVCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtZQUNFQyxPQUFPO1lBQ1B3QixTQUFTeEIsTUFBTXdCLE9BQU8sSUFBSTtRQUM1QixHQUNBO1lBQUV2QixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiRTpcXHByYWN0aWNlLWNvZGluZ1xcYXBwXFxhcGlcXHVzZXItcHJvYmxlbXNcXHN0YXRzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTdXBhYmFzZUFkbWluIH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlLWFkbWluXCJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKVxuICAgIGNvbnN0IHVzZXJJZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ1c2VySWRcIilcblxuICAgIGlmICghdXNlcklkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVc2VyIElEIGlzIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIC8vIFVzZSBhZG1pbiBjbGllbnQgZm9yIHNlcnZlciBvcGVyYXRpb25zIHRvIGJ5cGFzcyBSTFNcbiAgICBjb25zdCBzdXBhYmFzZSA9IGdldFN1cGFiYXNlQWRtaW4oKVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIEdldCB0b3RhbCBwcm9ibGVtcyBjb3VudCAtIG9ubHkgY291bnQsIGRvbid0IGZldGNoIGRhdGFcbiAgICAgIGNvbnN0IHsgY291bnQ6IHRvdGFsUHJvYmxlbXMsIGVycm9yOiB0b3RhbEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcImNvZGluZ19wcm9ibGVtc1wiKVxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcblxuICAgICAgaWYgKHRvdGFsRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlN1cGFiYXNlIHRvdGFsIGNvdW50IGVycm9yOlwiLCB0b3RhbEVycm9yKVxuICAgICAgICB0aHJvdyB0b3RhbEVycm9yXG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB1c2VyIHByb2JsZW1zIGJ5IHN0YXR1cyAtIG9ubHkgc2VsZWN0IHRoZSBzdGF0dXMgZmllbGRcbiAgICAgIGNvbnN0IHsgZGF0YTogdXNlclByb2JsZW1zLCBlcnJvcjogdXNlckVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInVzZXJfcHJvYmxlbXNcIilcbiAgICAgICAgLnNlbGVjdChcInN0YXR1c1wiKVxuICAgICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcblxuICAgICAgaWYgKHVzZXJFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU3VwYWJhc2UgdXNlciBwcm9ibGVtcyBlcnJvcjpcIiwgdXNlckVycm9yKVxuICAgICAgICB0aHJvdyB1c2VyRXJyb3JcbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIHN0YXRzXG4gICAgICBjb25zdCBzdGF0cyA9IHtcbiAgICAgICAgc29sdmVkOiAwLFxuICAgICAgICBhdHRlbXB0ZWQ6IDAsXG4gICAgICAgIHNhdmVkOiAwLFxuICAgICAgICB0b3RhbDogdG90YWxQcm9ibGVtcyB8fCAwLFxuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VyUHJvYmxlbXMpKSB7XG4gICAgICAgIHVzZXJQcm9ibGVtcy5mb3JFYWNoKChwcm9ibGVtKSA9PiB7XG4gICAgICAgICAgaWYgKHByb2JsZW0uc3RhdHVzID09PSBcInNvbHZlZFwiKSB7XG4gICAgICAgICAgICBzdGF0cy5zb2x2ZWQrK1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvYmxlbS5zdGF0dXMgPT09IFwiYXR0ZW1wdGVkXCIpIHtcbiAgICAgICAgICAgIHN0YXRzLmF0dGVtcHRlZCsrXG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9ibGVtLnN0YXR1cyA9PT0gXCJzYXZlZFwiKSB7XG4gICAgICAgICAgICBzdGF0cy5zYXZlZCsrXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oc3RhdHMpXG4gICAgfSBjYXRjaCAoc3VwYWJhc2VFcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU3VwYWJhc2UgZXJyb3I6XCIsIHN1cGFiYXNlRXJyb3IpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlcnJvcjogXCJEYXRhYmFzZSBlcnJvclwiLFxuICAgICAgICAgIG1lc3NhZ2U6IHN1cGFiYXNlRXJyb3IubWVzc2FnZSxcbiAgICAgICAgICBkZXRhaWxzOiBzdXBhYmFzZUVycm9yLmRldGFpbHMgfHwgXCJObyBhZGRpdGlvbmFsIGRldGFpbHNcIixcbiAgICAgICAgfSxcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9LFxuICAgICAgKVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIHByb2JsZW0gc3RhdHM6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHtcbiAgICAgICAgZXJyb3I6IFwiRXJyb3IgZmV0Y2hpbmcgdXNlciBwcm9ibGVtIHN0YXRzXCIsXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIsXG4gICAgICB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9LFxuICAgIClcbiAgfVxufVxuXG4iXSwibmFtZXMiOlsiZ2V0U3VwYWJhc2VBZG1pbiIsIk5leHRSZXNwb25zZSIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJ1c2VySWQiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJzdXBhYmFzZSIsImNvdW50IiwidG90YWxQcm9ibGVtcyIsInRvdGFsRXJyb3IiLCJmcm9tIiwic2VsZWN0IiwiaGVhZCIsImNvbnNvbGUiLCJkYXRhIiwidXNlclByb2JsZW1zIiwidXNlckVycm9yIiwiZXEiLCJzdGF0cyIsInNvbHZlZCIsImF0dGVtcHRlZCIsInNhdmVkIiwidG90YWwiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwicHJvYmxlbSIsInN1cGFiYXNlRXJyb3IiLCJtZXNzYWdlIiwiZGV0YWlscyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user-problems/stats/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase-admin.ts":
/*!*******************************!*\
  !*** ./lib/supabase-admin.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Environment variables for Supabase\nconst supabaseUrl = \"https://nrrggriaxgwkfyiocafi.supabase.co\";\nconst supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n// Create a singleton instance for admin/service operations\nlet supabaseAdminInstance = null;\nfunction getSupabaseAdmin() {\n    if (!supabaseServiceKey) {\n        throw new Error(\"SUPABASE_SERVICE_ROLE_KEY is not defined\");\n    }\n    if (!supabaseAdminInstance) {\n        supabaseAdminInstance = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseServiceKey, {\n            auth: {\n                persistSession: false,\n                autoRefreshToken: false\n            }\n        });\n    }\n    return supabaseAdminInstance;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UtYWRtaW4udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0Q7QUFFcEQscUNBQXFDO0FBQ3JDLE1BQU1DLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxxQkFBcUJILFFBQVFDLEdBQUcsQ0FBQ0cseUJBQXlCO0FBRWhFLDJEQUEyRDtBQUMzRCxJQUFJQyx3QkFBZ0U7QUFFN0QsU0FBU0M7SUFDZCxJQUFJLENBQUNILG9CQUFvQjtRQUN2QixNQUFNLElBQUlJLE1BQU07SUFDbEI7SUFFQSxJQUFJLENBQUNGLHVCQUF1QjtRQUMxQkEsd0JBQXdCUCxtRUFBWUEsQ0FBQ0MsYUFBYUksb0JBQW9CO1lBQ3BFSyxNQUFNO2dCQUNKQyxnQkFBZ0I7Z0JBQ2hCQyxrQkFBa0I7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBT0w7QUFDVCIsInNvdXJjZXMiOlsiRTpcXHByYWN0aWNlLWNvZGluZ1xcbGliXFxzdXBhYmFzZS1hZG1pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCJcblxuLy8gRW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciBTdXBhYmFzZVxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXG5jb25zdCBzdXBhYmFzZVNlcnZpY2VLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIVxuXG4vLyBDcmVhdGUgYSBzaW5nbGV0b24gaW5zdGFuY2UgZm9yIGFkbWluL3NlcnZpY2Ugb3BlcmF0aW9uc1xubGV0IHN1cGFiYXNlQWRtaW5JbnN0YW5jZTogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50PiB8IG51bGwgPSBudWxsXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBhYmFzZUFkbWluKCkge1xuICBpZiAoIXN1cGFiYXNlU2VydmljZUtleSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkgaXMgbm90IGRlZmluZWRcIilcbiAgfVxuXG4gIGlmICghc3VwYWJhc2VBZG1pbkluc3RhbmNlKSB7XG4gICAgc3VwYWJhc2VBZG1pbkluc3RhbmNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZVNlcnZpY2VLZXksIHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgcGVyc2lzdFNlc3Npb246IGZhbHNlLFxuICAgICAgICBhdXRvUmVmcmVzaFRva2VuOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBzdXBhYmFzZUFkbWluSW5zdGFuY2Vcbn1cblxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlU2VydmljZUtleSIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJzdXBhYmFzZUFkbWluSW5zdGFuY2UiLCJnZXRTdXBhYmFzZUFkbWluIiwiRXJyb3IiLCJhdXRoIiwicGVyc2lzdFNlc3Npb24iLCJhdXRvUmVmcmVzaFRva2VuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase-admin.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Fstats%2Froute&page=%2Fapi%2Fuser-problems%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Fstats%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Fstats%2Froute&page=%2Fapi%2Fuser-problems%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Fstats%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_practice_coding_app_api_user_problems_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user-problems/stats/route.ts */ \"(rsc)/./app/api/user-problems/stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user-problems/stats/route\",\n        pathname: \"/api/user-problems/stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/user-problems/stats/route\"\n    },\n    resolvedPagePath: \"E:\\\\practice-coding\\\\app\\\\api\\\\user-problems\\\\stats\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_practice_coding_app_api_user_problems_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyLXByb2JsZW1zJTJGc3RhdHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVzZXItcHJvYmxlbXMlMkZzdGF0cyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVzZXItcHJvYmxlbXMlMkZzdGF0cyUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDcHJhY3RpY2UtY29kaW5nJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1FJTNBJTVDcHJhY3RpY2UtY29kaW5nJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNhO0FBQzFGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJFOlxcXFxwcmFjdGljZS1jb2RpbmdcXFxcYXBwXFxcXGFwaVxcXFx1c2VyLXByb2JsZW1zXFxcXHN0YXRzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91c2VyLXByb2JsZW1zL3N0YXRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlci1wcm9ibGVtcy9zdGF0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci1wcm9ibGVtcy9zdGF0cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkU6XFxcXHByYWN0aWNlLWNvZGluZ1xcXFxhcHBcXFxcYXBpXFxcXHVzZXItcHJvYmxlbXNcXFxcc3RhdHNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Fstats%2Froute&page=%2Fapi%2Fuser-problems%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Fstats%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser-problems%2Fstats%2Froute&page=%2Fapi%2Fuser-problems%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser-problems%2Fstats%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();