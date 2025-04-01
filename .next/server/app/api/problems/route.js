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
exports.id = "app/api/problems/route";
exports.ids = ["app/api/problems/route"];
exports.modules = {

/***/ "(rsc)/./app/api/problems/route.ts":
/*!***********************************!*\
  !*** ./app/api/problems/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/supabase-admin */ \"(rsc)/./lib/supabase-admin.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const ids = searchParams.get(\"ids\");\n        if (!ids) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Problem IDs are required\"\n            }, {\n                status: 400\n            });\n        }\n        const problemIds = ids.split(\",\").map((id)=>Number.parseInt(id));\n        // Limit the number of IDs to prevent rate limiting\n        const limitedIds = problemIds.slice(0, 100);\n        const supabase = (0,_lib_supabase_admin__WEBPACK_IMPORTED_MODULE_0__.getSupabaseAdmin)();\n        try {\n            // Only select the fields we need\n            const { data, error } = await supabase.from(\"coding_problems\").select(\"id, problem_id, problem_name, company_name, difficulty, url\").in(\"id\", limitedIds);\n            if (error) {\n                throw error;\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(data);\n        } catch (supabaseError) {\n            console.error(\"Supabase error:\", supabaseError);\n            // Return a proper JSON error for rate limiting\n            if (supabaseError.message && supabaseError.message.includes(\"Too many requests\")) {\n                return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                    error: \"Too many requests, please try again later\"\n                }, {\n                    status: 429,\n                    headers: {\n                        \"Retry-After\": \"5\"\n                    }\n                });\n            }\n            // Return other errors as JSON\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: supabaseError.message || \"Database error\"\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error(\"Error fetching problems:\", error);\n        // Return a proper JSON error response\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: error.message || \"Error fetching problems\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2JsZW1zL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1RDtBQUNiO0FBRW5DLGVBQWVFLElBQUlDLE9BQWdCO0lBQ3hDLElBQUk7UUFDRixNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7UUFDNUMsTUFBTUMsTUFBTUgsYUFBYUksR0FBRyxDQUFDO1FBRTdCLElBQUksQ0FBQ0QsS0FBSztZQUNSLE9BQU9OLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBMkIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ2hGO1FBRUEsTUFBTUMsYUFBYUwsSUFBSU0sS0FBSyxDQUFDLEtBQUtDLEdBQUcsQ0FBQyxDQUFDQyxLQUFPQyxPQUFPQyxRQUFRLENBQUNGO1FBRTlELG1EQUFtRDtRQUNuRCxNQUFNRyxhQUFhTixXQUFXTyxLQUFLLENBQUMsR0FBRztRQUV2QyxNQUFNQyxXQUFXcEIscUVBQWdCQTtRQUVqQyxJQUFJO1lBQ0YsaUNBQWlDO1lBQ2pDLE1BQU0sRUFBRXFCLElBQUksRUFBRVgsS0FBSyxFQUFFLEdBQUcsTUFBTVUsU0FDM0JFLElBQUksQ0FBQyxtQkFDTEMsTUFBTSxDQUFDLCtEQUNQQyxFQUFFLENBQUMsTUFBTU47WUFFWixJQUFJUixPQUFPO2dCQUNULE1BQU1BO1lBQ1I7WUFFQSxPQUFPVCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDWTtRQUMzQixFQUFFLE9BQU9JLGVBQW9CO1lBQzNCQyxRQUFRaEIsS0FBSyxDQUFDLG1CQUFtQmU7WUFFakMsK0NBQStDO1lBQy9DLElBQUlBLGNBQWNFLE9BQU8sSUFBSUYsY0FBY0UsT0FBTyxDQUFDQyxRQUFRLENBQUMsc0JBQXNCO2dCQUNoRixPQUFPM0IscURBQVlBLENBQUNRLElBQUksQ0FDdEI7b0JBQUVDLE9BQU87Z0JBQTRDLEdBQ3JEO29CQUNFQyxRQUFRO29CQUNSa0IsU0FBUzt3QkFDUCxlQUFlO29CQUNqQjtnQkFDRjtZQUVKO1lBRUEsOEJBQThCO1lBQzlCLE9BQU81QixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO2dCQUFFQyxPQUFPZSxjQUFjRSxPQUFPLElBQUk7WUFBaUIsR0FBRztnQkFBRWhCLFFBQVE7WUFBSTtRQUMvRjtJQUNGLEVBQUUsT0FBT0QsT0FBWTtRQUNuQmdCLFFBQVFoQixLQUFLLENBQUMsNEJBQTRCQTtRQUUxQyxzQ0FBc0M7UUFDdEMsT0FBT1QscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFQyxPQUFPQSxNQUFNaUIsT0FBTyxJQUFJO1FBQTBCLEdBQUc7WUFBRWhCLFFBQVE7UUFBSTtJQUNoRztBQUNGIiwic291cmNlcyI6WyJFOlxccHJhY3RpY2UtY29kaW5nXFxhcHBcXGFwaVxccHJvYmxlbXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFN1cGFiYXNlQWRtaW4gfSBmcm9tIFwiQC9saWIvc3VwYWJhc2UtYWRtaW5cIlxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gICAgY29uc3QgaWRzID0gc2VhcmNoUGFyYW1zLmdldChcImlkc1wiKVxuXG4gICAgaWYgKCFpZHMpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlByb2JsZW0gSURzIGFyZSByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBwcm9ibGVtSWRzID0gaWRzLnNwbGl0KFwiLFwiKS5tYXAoKGlkKSA9PiBOdW1iZXIucGFyc2VJbnQoaWQpKVxuXG4gICAgLy8gTGltaXQgdGhlIG51bWJlciBvZiBJRHMgdG8gcHJldmVudCByYXRlIGxpbWl0aW5nXG4gICAgY29uc3QgbGltaXRlZElkcyA9IHByb2JsZW1JZHMuc2xpY2UoMCwgMTAwKVxuXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBnZXRTdXBhYmFzZUFkbWluKClcblxuICAgIHRyeSB7XG4gICAgICAvLyBPbmx5IHNlbGVjdCB0aGUgZmllbGRzIHdlIG5lZWRcbiAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwiY29kaW5nX3Byb2JsZW1zXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgcHJvYmxlbV9pZCwgcHJvYmxlbV9uYW1lLCBjb21wYW55X25hbWUsIGRpZmZpY3VsdHksIHVybFwiKVxuICAgICAgICAuaW4oXCJpZFwiLCBsaW1pdGVkSWRzKVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEpXG4gICAgfSBjYXRjaCAoc3VwYWJhc2VFcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU3VwYWJhc2UgZXJyb3I6XCIsIHN1cGFiYXNlRXJyb3IpXG5cbiAgICAgIC8vIFJldHVybiBhIHByb3BlciBKU09OIGVycm9yIGZvciByYXRlIGxpbWl0aW5nXG4gICAgICBpZiAoc3VwYWJhc2VFcnJvci5tZXNzYWdlICYmIHN1cGFiYXNlRXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIlRvbyBtYW55IHJlcXVlc3RzXCIpKSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgICB7IGVycm9yOiBcIlRvbyBtYW55IHJlcXVlc3RzLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0dXM6IDQyOSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJSZXRyeS1BZnRlclwiOiBcIjVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gb3RoZXIgZXJyb3JzIGFzIEpTT05cbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBzdXBhYmFzZUVycm9yLm1lc3NhZ2UgfHwgXCJEYXRhYmFzZSBlcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgcHJvYmxlbXM6XCIsIGVycm9yKVxuXG4gICAgLy8gUmV0dXJuIGEgcHJvcGVyIEpTT04gZXJyb3IgcmVzcG9uc2VcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIkVycm9yIGZldGNoaW5nIHByb2JsZW1zXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbiJdLCJuYW1lcyI6WyJnZXRTdXBhYmFzZUFkbWluIiwiTmV4dFJlc3BvbnNlIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImlkcyIsImdldCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInByb2JsZW1JZHMiLCJzcGxpdCIsIm1hcCIsImlkIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJsaW1pdGVkSWRzIiwic2xpY2UiLCJzdXBhYmFzZSIsImRhdGEiLCJmcm9tIiwic2VsZWN0IiwiaW4iLCJzdXBhYmFzZUVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsImhlYWRlcnMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/problems/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase-admin.ts":
/*!*******************************!*\
  !*** ./lib/supabase-admin.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Environment variables for Supabase\nconst supabaseUrl = \"https://nrrggriaxgwkfyiocafi.supabase.co\";\nconst supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n// Create a singleton instance for admin/service operations\nlet supabaseAdminInstance = null;\nfunction getSupabaseAdmin() {\n    if (!supabaseServiceKey) {\n        throw new Error(\"SUPABASE_SERVICE_ROLE_KEY is not defined\");\n    }\n    if (!supabaseAdminInstance) {\n        supabaseAdminInstance = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseServiceKey, {\n            auth: {\n                persistSession: false,\n                autoRefreshToken: false\n            }\n        });\n    }\n    return supabaseAdminInstance;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UtYWRtaW4udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0Q7QUFFcEQscUNBQXFDO0FBQ3JDLE1BQU1DLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxxQkFBcUJILFFBQVFDLEdBQUcsQ0FBQ0cseUJBQXlCO0FBRWhFLDJEQUEyRDtBQUMzRCxJQUFJQyx3QkFBZ0U7QUFFN0QsU0FBU0M7SUFDZCxJQUFJLENBQUNILG9CQUFvQjtRQUN2QixNQUFNLElBQUlJLE1BQU07SUFDbEI7SUFFQSxJQUFJLENBQUNGLHVCQUF1QjtRQUMxQkEsd0JBQXdCUCxtRUFBWUEsQ0FBQ0MsYUFBYUksb0JBQW9CO1lBQ3BFSyxNQUFNO2dCQUNKQyxnQkFBZ0I7Z0JBQ2hCQyxrQkFBa0I7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBT0w7QUFDVCIsInNvdXJjZXMiOlsiRTpcXHByYWN0aWNlLWNvZGluZ1xcbGliXFxzdXBhYmFzZS1hZG1pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCJcblxuLy8gRW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciBTdXBhYmFzZVxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXG5jb25zdCBzdXBhYmFzZVNlcnZpY2VLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIVxuXG4vLyBDcmVhdGUgYSBzaW5nbGV0b24gaW5zdGFuY2UgZm9yIGFkbWluL3NlcnZpY2Ugb3BlcmF0aW9uc1xubGV0IHN1cGFiYXNlQWRtaW5JbnN0YW5jZTogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50PiB8IG51bGwgPSBudWxsXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBhYmFzZUFkbWluKCkge1xuICBpZiAoIXN1cGFiYXNlU2VydmljZUtleSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkgaXMgbm90IGRlZmluZWRcIilcbiAgfVxuXG4gIGlmICghc3VwYWJhc2VBZG1pbkluc3RhbmNlKSB7XG4gICAgc3VwYWJhc2VBZG1pbkluc3RhbmNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZVNlcnZpY2VLZXksIHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgcGVyc2lzdFNlc3Npb246IGZhbHNlLFxuICAgICAgICBhdXRvUmVmcmVzaFRva2VuOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBzdXBhYmFzZUFkbWluSW5zdGFuY2Vcbn1cblxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlU2VydmljZUtleSIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJzdXBhYmFzZUFkbWluSW5zdGFuY2UiLCJnZXRTdXBhYmFzZUFkbWluIiwiRXJyb3IiLCJhdXRoIiwicGVyc2lzdFNlc3Npb24iLCJhdXRvUmVmcmVzaFRva2VuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase-admin.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproblems%2Froute&page=%2Fapi%2Fproblems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproblems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproblems%2Froute&page=%2Fapi%2Fproblems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproblems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_practice_coding_app_api_problems_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/problems/route.ts */ \"(rsc)/./app/api/problems/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/problems/route\",\n        pathname: \"/api/problems\",\n        filename: \"route\",\n        bundlePath: \"app/api/problems/route\"\n    },\n    resolvedPagePath: \"E:\\\\practice-coding\\\\app\\\\api\\\\problems\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_practice_coding_app_api_problems_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9ibGVtcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcHJvYmxlbXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwcm9ibGVtcyUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDcHJhY3RpY2UtY29kaW5nJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1FJTNBJTVDcHJhY3RpY2UtY29kaW5nJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJFOlxcXFxwcmFjdGljZS1jb2RpbmdcXFxcYXBwXFxcXGFwaVxcXFxwcm9ibGVtc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcHJvYmxlbXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wcm9ibGVtc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcHJvYmxlbXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJFOlxcXFxwcmFjdGljZS1jb2RpbmdcXFxcYXBwXFxcXGFwaVxcXFxwcm9ibGVtc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproblems%2Froute&page=%2Fapi%2Fproblems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproblems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproblems%2Froute&page=%2Fapi%2Fproblems%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproblems%2Froute.ts&appDir=E%3A%5Cpractice-coding%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Cpractice-coding&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();